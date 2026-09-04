import { readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { listedByPath, readingIn } from "@akasha/indexes"
import type { Reading } from "@akasha/indexes/shape"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import type { Value } from "@akasha/pages-system/page-value"
import { counted } from "../../../asking/asking.module.code.ts"
import { PART_SLUGS, withoutPart, withPart } from "../listing/move-listing.module.code.ts"

const DOMAIN = "domain"

const PAGE_TYPE = "page-type"

const PLURAL_SLUG = "pluralSlug"

const HELD_FOLDERS = new Set(["modules", "pages", "properties", "scripts"])

const ROOT = ""

const HERE = "."

const EMPTY: ReadonlyMap<string, string> = new Map()

export const PARENT_SPELLING =
  "a page's one parent is the page holding the folder it sits in, so a page carried from one " +
  "folder to another leaves the parts of the page it was under and joins the parts of the page " +
  "it arrives under"

export const KEPT_SPELLING =
  "holding the folder a page sits in is how a parent is usually found rather than what makes " +
  "one, so a page arriving where no page holds keeps the parent naming it and is still named " +
  "by exactly one page"

export type Holder = {
  readonly at: string
  readonly was: string
  readonly address: string
  readonly pageType: string
  readonly slug: string
}

export type Held = { readonly holders: readonly Holder[] } | { readonly unheld: string }

export type Placing = {
  readonly reading: Reading
  readonly moved: ReadonlyMap<string, string>
  readonly root: string
  readonly valueAt: (path: string) => Value | null
}

export function ownFile(placing: Placing, was: string): boolean {
  return listedByPath(placing.reading, was).some((one) => one.path === was)
}

function holderFor(placing: Placing, at: string, was: string): Holder | null {
  if (!ownFile(placing, was)) return null
  const said = partedIn(at)
  if (said === null) return null
  return {
    at,
    was,
    address: `${said.pageType}/${said.slug}`,
    pageType: said.pageType,
    slug: said.slug,
  }
}

export function filesIn(placing: Placing, folder: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  let held: readonly string[] = []
  try {
    held = readdirSync(join(placing.root, folder), { withFileTypes: true })
      .filter((one) => one.isFile())
      .map((one) => one.name)
  } catch {
    held = []
  }
  for (const name of held) {
    const path = folder === ROOT ? name : `${folder}/${name}`
    if (!placing.moved.has(path)) found.set(path, path)
  }
  for (const [from, to] of placing.moved) {
    if (dirname(to) === (folder === ROOT ? HERE : folder)) found.set(to, from)
  }
  return found
}

export function pagesIn(placing: Placing, folder: string): readonly Holder[] {
  const found: Holder[] = []
  for (const [at, was] of [...filesIn(placing, folder)].sort()) {
    const one = holderFor(placing, at, was)
    if (one !== null) found.push(one)
  }
  return found
}

function pluralOf(placing: Placing, one: Holder): string | null {
  if (one.pageType !== PAGE_TYPE) return null
  const value = placing.valueAt(one.was)
  const said = value === null ? null : value[PLURAL_SLUG]
  return typeof said === "string" && said !== "" ? said : null
}

export function holdingIn(placing: Placing, held: readonly Holder[]): readonly Holder[] {
  if (held.length < 2) return held
  const kept = held.filter(
    (one) => !held.some((two) => two.at !== one.at && holdsPart(placing, two, [one.address]))
  )
  return kept.length === 1 ? kept : []
}

function namesOf(placing: Placing, held: readonly Holder[]): readonly string[] {
  const one = held[0]
  if (one === undefined) return []
  const plural = pluralOf(placing, one)
  return plural === null ? [one.slug] : [one.slug, plural]
}

export function holdersFor(placing: Placing, folder: string, moved: string): Held {
  const crossed: string[] = []
  let at = folder
  for (;;) {
    if (at === ROOT || at === HERE || at === "/") {
      return { unheld: crossed.join(", ") }
    }
    const held = pagesIn(placing, at).filter((one) => one.at !== moved)
    const holding = holdingIn(placing, held)
    const named = basename(at)
    const grouping = HELD_FOLDERS.has(named) && !namesOf(placing, holding).includes(named)
    if (!grouping && holding.length > 0) return { holders: holding }
    crossed.push(at)
    at = dirname(at)
    if (at === HERE) at = ROOT
  }
}

export function holdsPart(placing: Placing, one: Holder, named: readonly string[]): boolean {
  const value = placing.valueAt(one.was)
  const said = value === null ? null : value[PART_SLUGS]
  if (!Array.isArray(said)) return false
  return said.some((held) => typeof held === "string" && named.includes(held))
}

export type Parenting = {
  readonly path: string
  readonly address: string
  readonly named: readonly string[]
  readonly leaving: Holder
  readonly joining: Holder
}

const NOTHING: Parented = { parentings: [], keepings: [], unread: null }

export type Keeping = {
  readonly address: string
  readonly folder: string
  readonly crossed: string
}

export type Parting = {
  readonly parentings: readonly Parenting[]
  readonly keepings: readonly Keeping[]
  readonly unread: string | null
}

export type Parented = Parting | { readonly refusals: readonly string[] }

function unheldSaid(path: string, address: string, crossed: string): string {
  return (
    `${path} was in a folder no page holds — ${PARENT_SPELLING}, and no page's own file is in ` +
    `${crossed} or in any folder above them up to the repository root, so which page would stop ` +
    `naming \`${address}\` among its parts cannot be told, and nothing here is repointed`
  )
}

function heldBy(held: readonly Holder[]): string {
  return held.map((one) => one.at).join(" and ")
}

function outOf(from: string, address: string, held: readonly Holder[]): string {
  return (
    `${from} was in \`${dirname(from)}\`, which ${heldBy(held)} holds, and no page holding that ` +
    `folder names \`${address}\` among its parts — ${PARENT_SPELLING}, and the page this would ` +
    `take \`${address}\` out of cannot be told, so nothing here is repointed`
  )
}

export function partedFor(
  placing: Placing,
  under: ReadonlySet<string>,
  from: string,
  to: string
): Parented | null {
  const said = partedIn(to)
  if (said === null || !ownFile(placing, from) || !under.has(said.pageType)) return null
  if (dirname(from) === dirname(to)) return null
  const address = `${said.pageType}/${said.slug}`
  const was = partedIn(from)
  const named = was === null ? [address] : [address, `${was.pageType}/${was.slug}`]
  const target = holdersFor(placing, dirname(to), to)
  if ("unheld" in target) {
    const kept = { address, folder: dirname(to), crossed: target.unheld }
    return { parentings: [], keepings: [kept], unread: null }
  }
  if (target.holders.some((one) => holdsPart(placing, one, named))) return NOTHING
  const before = holdersFor({ ...placing, moved: EMPTY }, dirname(from), from)
  if ("unheld" in before) return { refusals: [unheldSaid(from, address, before.unheld)] }
  const found = before.holders.find((one) => holdsPart(placing, one, named))
  if (found === undefined) return { refusals: [outOf(from, address, before.holders)] }
  const leaving = { ...found, at: placing.moved.get(found.was) ?? found.at }
  if (target.holders.some((one) => one.was === leaving.was)) return NOTHING
  const joining = target.holders[0]
  if (joining === undefined || target.holders.length > 1) {
    return {
      refusals: [
        `${to} would arrive in \`${dirname(to)}\`, which ${heldBy(target.holders)} hold together, ` +
          `so which of them would name \`${address}\` among its parts cannot be told`,
      ],
    }
  }
  const one = { path: to, address, named, leaving, joining }
  return { parentings: [one], keepings: [], unread: null }
}

export type Edited = { readonly path: string; readonly was: string; readonly text: string }

export type Edits = { readonly edits: readonly Edited[] } | { readonly refusals: readonly string[] }

export function editedFor(
  held: readonly Parenting[],
  textAt: (path: string, was: string) => string | null
): Edits {
  const refusals: string[] = []
  const found = new Map<string, Edited>()
  const readAt = (one: Holder): string | null => found.get(one.at)?.text ?? textAt(one.at, one.was)
  const put = (one: Holder, text: string): undefined => {
    found.set(one.at, { path: one.at, was: one.was, text })
  }
  for (const one of held) {
    const out = readAt(one.leaving)
    const dropped = out === null ? null : withoutPart(one.leaving.at, out, one.named)
    if (dropped === null) {
      refusals.push(
        `${one.leaving.at} was to stop naming \`${one.address}\` among its parts and its ` +
          "`partSlugs` could not be read with that part in it"
      )
      continue
    }
    put(one.leaving, dropped)
    const into = readAt(one.joining)
    const added = into === null ? null : withPart(one.joining.at, into, one.address)
    if (added === null) {
      refusals.push(
        `${one.joining.at} holds where \`${one.address}\` arrives and states no \`partSlugs\` ` +
          "this could add to — state `partSlugs` there and ask again"
      )
      continue
    }
    put(one.joining, added)
  }
  return refusals.length > 0 ? { refusals } : { edits: [...found.values()] }
}

export function parentedOver(
  root: string,
  sides: readonly { readonly from: string; readonly to: string }[],
  moved: ReadonlyMap<string, string>,
  valueAt: (path: string) => Value | null
): Parented {
  const reading = readingIn(root)
  const placing: Placing = { reading, moved, root, valueAt }
  const under = kindsUnder(DOMAIN, reading, valueAt)
  const refusals: string[] = []
  const parentings: Parenting[] = []
  const keepings: Keeping[] = []
  for (const one of sides) {
    const said = partedFor(placing, under, one.from, one.to)
    if (said === null) continue
    if ("refusals" in said) {
      refusals.push(...said.refusals)
      continue
    }
    parentings.push(...said.parentings)
    keepings.push(...said.keepings)
  }
  return refusals.length > 0 ? { refusals } : { parentings, keepings, unread: null }
}

export function parentingOver(
  root: string,
  sides: readonly { readonly from: string; readonly to: string }[],
  moved: ReadonlyMap<string, string>,
  valueAt: (path: string) => Value | null
): Parented {
  try {
    return parentedOver(root, sides, moved, valueAt)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { parentings: [], keepings: [], unread: `${why}, so no page's parts were changed` }
  }
}

function keptSaid(one: Keeping, dry: boolean): string {
  return (
    `\`${one.address}\` ${dry ? "would keep" : "kept"} the parent it has, since no page's own ` +
    `file is in ${one.crossed} or in any folder above them up to the repository root, so no page ` +
    `holds \`${one.folder}\`, where it ${dry ? "would arrive" : "arrived"}`
  )
}

export function parentingSaid(parted: Parting, dry: boolean): readonly string[] {
  const kept = parted.keepings.map((one) => keptSaid(one, dry))
  if (kept.length > 0) kept.push(KEPT_SPELLING)
  const held = parted.parentings
  if (held.length === 0) return ["no page carried here changed the page holding it", ...kept]
  const said = [
    `${counted(held.length, "page")} ${dry ? "would change" : "changed"} the page holding ` +
      `${held.length === 1 ? "it" : "them"}`,
  ]
  for (const one of held) {
    said.push(
      `  \`${one.address}\` ${dry ? "would leave" : "left"} the parts of ${one.leaving.at} and ` +
        `${dry ? "join" : "joined"} the parts of ${one.joining.at}`
    )
  }
  said.push(PARENT_SPELLING)
  return [...said, ...kept]
}
