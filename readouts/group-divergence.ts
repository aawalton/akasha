import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { valuesOfType } from "@akasha/indexes"
import { type ReadoutCatalog, readoutCatalog } from "./readout-catalog.ts"

/**
 * What a readout group holds read through the markdown catalog against what it holds read through
 * the akasha index, and why the two disagree.
 *
 * Two engines answer the question "which readouts does this group hold". `readoutCatalog()` reads
 * the `*.readout.md` documents the `readout` page type names under `files:`. The pages service —
 * which is what the status bar and the widget routes actually ask — reads the akasha index, built
 * over `akasha/` alone from the `*.readout.ts` pages. Neither knows the other exists.
 *
 * That has already cost a reading. A readout removed on the TypeScript side went on being answered
 * from its markdown twin, the wire said three lights and the status bar said five, and every test
 * aimed at it stayed green because each one could see a single side. The instrument that was
 * missing is this one: resolve each group through both and refuse where the member sets differ.
 *
 * This compares what each side would DRAW. The markdown side holds `enabled: false` for a readout
 * Alan ruled must stay on the page while leaving the strip, so a stilled member is not a member
 * here. The akasha page type carries no such property, so everything it holds is drawn.
 */

const READOUT = "readout"

const INDEX_UNDER = join(".git", "data", "index")

/** A readout as the akasha index carries it, narrowed to what a group's membership turns on. */
export interface AkashaReadout {
  readonly slug: string
  readonly label: string | null
  readonly place: number | null
  readonly scaleSlug: string | null
  readonly wireKey: string | null
  readonly groupSlugs: readonly string[]
}

function textIn(held: unknown): string | null {
  return typeof held === "string" && held !== "" ? held : null
}

function numberIn(held: unknown): number | null {
  return typeof held === "number" && Number.isFinite(held) ? held : null
}

function namesIn(held: unknown): readonly string[] {
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

/**
 * The checkout the akasha index stands in, found by walking up from this file.
 *
 * The root is walked for rather than read from `rootsHere()` on purpose: that reader is part of
 * the markdown page machinery, and a check on whether anything still reads a readout through the
 * markdown engine that reached the markdown engine to answer would be measuring itself.
 */
export function rootHolding(from: string = import.meta.dir): string {
  for (let at = from; ; at = dirname(at)) {
    if (existsSync(join(at, INDEX_UNDER))) return at
    const up = dirname(at)
    if (up === at) {
      throw new Error(
        `rootHolding: no \`${INDEX_UNDER}\` stands at or above \`${from}\`, and the akasha side ` +
          "of this comparison is read from that index — an index that is missing is not an index " +
          "naming no readout. Run `akasha index refresh`."
      )
    }
  }
}

/** Every readout the akasha index holds, keyed by slug. */
export function akashaReadouts(root: string = rootHolding()): ReadonlyMap<string, AkashaReadout> {
  const held = new Map<string, AkashaReadout>()
  for (const { value } of valuesOfType(root, READOUT)) {
    const slug = textIn(value.slug)
    if (slug === null) continue
    held.set(slug, {
      slug,
      label: textIn(value.label),
      place: numberIn(value.place),
      scaleSlug: textIn(value.scaleSlug),
      wireKey: textIn(value.wireKey),
      groupSlugs: namesIn(value.groupSlugs),
    })
  }
  return held
}

export interface GroupSides {
  readonly groupSlug: string
  /** Members the markdown catalog would draw: it names the group and is not `enabled: false`. */
  readonly inMarkdown: readonly string[]
  /** Members the akasha index holds for the group. */
  readonly inAkasha: readonly string[]
  /** Drawn on the markdown side and held by no akasha page of that slug. */
  readonly markdownOnly: readonly string[]
  /** Held on the akasha side and drawn by no markdown page of that slug. */
  readonly akashaOnly: readonly string[]
  /**
   * One readout the two sides spell differently, as `[markdown slug, akasha slug]`.
   *
   * The wire key is what reaches a widget's circle and a stoplight's `habit`, so two pages sharing
   * one are the same reading under two names rather than two readings. That is a real difference —
   * `resolveReadout(slug)` finds one and not the other — and it is not a member lost, so it is
   * carried apart from the counts.
   */
  readonly renamed: readonly (readonly [string, string])[]
}

function drawnInMarkdown(groupSlug: string, catalog: ReadoutCatalog): readonly string[] {
  const drawn: string[] = []
  for (const [slug, row] of catalog.readouts) {
    if (!row.enabled || !(row.groupSlugs ?? []).includes(groupSlug)) continue
    drawn.push(slug)
  }
  return drawn.sort()
}

function heldInAkasha(
  groupSlug: string,
  akasha: ReadonlyMap<string, AkashaReadout>
): readonly string[] {
  const held: string[] = []
  for (const [slug, one] of akasha) {
    if (one.groupSlugs.includes(groupSlug)) held.push(slug)
  }
  return held.sort()
}

export function sidesOf(
  groupSlug: string,
  catalog: ReadoutCatalog,
  akasha: ReadonlyMap<string, AkashaReadout>
): GroupSides {
  const inMarkdown = drawnInMarkdown(groupSlug, catalog)
  const inAkasha = heldInAkasha(groupSlug, akasha)
  const here = new Set(inMarkdown)
  const there = new Set(inAkasha)
  const markdownOnly = inMarkdown.filter((one) => !there.has(one))
  const akashaOnly = inAkasha.filter((one) => !here.has(one))

  const renamed: (readonly [string, string])[] = []
  const paired = new Set<string>()
  for (const slug of markdownOnly) {
    const wireKey = catalog.readouts.get(slug)?.wireKey ?? null
    if (wireKey === null) continue
    const twin = akashaOnly.find(
      (one) => !paired.has(one) && akasha.get(one)?.wireKey === wireKey
    )
    if (twin === undefined) continue
    paired.add(twin)
    renamed.push([slug, twin])
  }
  const spelledTwice = new Set([...renamed.flat()])

  return {
    groupSlug,
    inMarkdown,
    inAkasha,
    markdownOnly: markdownOnly.filter((one) => !spelledTwice.has(one)),
    akashaOnly: akashaOnly.filter((one) => !spelledTwice.has(one)),
    renamed,
  }
}

const NONE = "nothing"

function listed(slugs: readonly string[]): string {
  return slugs.length === 0 ? NONE : slugs.map((one) => `\`${one}\``).join(", ")
}

/**
 * Why a group is not the same group read through the two engines, or an empty list where it is.
 *
 * A side holding nothing at all is called out on its own. A group the akasha index does not know
 * is not a group whose membership drifted; it is a group that has not been migrated, and a reader
 * moved onto the index before it exists would draw an empty strip rather than refuse.
 */
export function divergenceIn(held: GroupSides): readonly string[] {
  const why: string[] = []
  if (held.inAkasha.length === 0 && held.inMarkdown.length > 0) {
    why.push(
      `\`${held.groupSlug}\` is drawn by ${listed(held.inMarkdown)} in markdown and the akasha ` +
        "index holds no readout naming it at all, so this group has not been migrated and a " +
        "reader moved onto the index would draw an empty strip"
    )
    return why
  }
  if (held.inMarkdown.length === 0 && held.inAkasha.length > 0) {
    why.push(
      `\`${held.groupSlug}\` is held by ${listed(held.inAkasha)} in the akasha index and no ` +
        "markdown readout draws it, so the two engines answer a different group"
    )
    return why
  }
  if (held.markdownOnly.length > 0) {
    why.push(
      `\`${held.groupSlug}\` draws ${listed(held.markdownOnly)} out of markdown and the akasha ` +
        `index holds no readout of that slug, so the group is ${held.inMarkdown.length} lights ` +
        `through one engine and ${held.inAkasha.length} through the other`
    )
  }
  if (held.akashaOnly.length > 0) {
    why.push(
      `\`${held.groupSlug}\` holds ${listed(held.akashaOnly)} in the akasha index and no markdown ` +
        "readout of that slug draws it, so a light reaches the wire that the markdown side does " +
        "not know is there"
    )
  }
  for (const [here, there] of held.renamed) {
    why.push(
      `\`${held.groupSlug}\` spells one reading \`${here}\` in markdown and \`${there}\` in the ` +
        "akasha index, both carrying the same wire key, so the strip agrees and " +
        `\`resolveReadout("${here}")\` finds no page once the reader moves`
    )
  }
  return why
}

/** The reasons every named group is not the same group read through both engines. */
export function groupsDivergentIn(
  groupSlugs: readonly string[],
  catalog: ReadoutCatalog = readoutCatalog(),
  akasha: ReadonlyMap<string, AkashaReadout> = akashaReadouts()
): readonly string[] {
  return groupSlugs.flatMap((slug) => divergenceIn(sidesOf(slug, catalog, akasha)))
}

/**
 * Refuses where any named group is not the same group read through both engines.
 *
 * This throws rather than answering the smaller side. Both sides answer a plausible strip, and a
 * plausible strip is what nobody checks: the failure this exists for ran for as long as it did
 * because five lights and three lights are both readings a person would believe.
 */
export function groupsAgreeAcrossEngines(
  groupSlugs: readonly string[],
  catalog: ReadoutCatalog = readoutCatalog(),
  akasha: ReadonlyMap<string, AkashaReadout> = akashaReadouts()
): undefined {
  const why = groupsDivergentIn(groupSlugs, catalog, akasha)
  if (why.length > 0) {
    throw new Error(
      "groupsAgreeAcrossEngines: a readout group is not the group its other engine answers, and " +
        "nothing compares them at the point either is read, so carrying on would draw one strip " +
        `while the wire carries another — ${why.join(" | ")}`
    )
  }
  return undefined
}
