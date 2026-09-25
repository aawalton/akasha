import { levelOf } from "akasha/alan/attribute/modules/level/attribute-level.module.code.ts"
import { ATTRIBUTE_OF } from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.code.ts"
import { totalAttributes } from "akasha/alan/harness/attribute/modules/attributes-totalling/attributes-totalling.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureAttribute as page } from "akasha/command/pages/measure/attribute/measure-attribute.command.ts"
import {
  flooredTo,
  linesOf,
  type Measured,
  PLACES,
} from "akasha/command/pages/measure/modules/tabling/measure-tabling.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

const READOUT = "readout"

const NOTHING_KEPT =
  "no attribute could be added up over the days Alan tracked, so there is nothing to say. A " +
  "figure Alan did not earn would be a lie, and no figure at all is not a figure of zero."

const NONE_KEPT = "no day Alan tracked carries what this attribute counts"

export type Drawn = {
  readonly label: string
  readonly place: number
  readonly attributeSlug: string
}

type Read = {
  readonly measured: readonly Measured[]
  readonly unread: readonly string[]
}

function drawnIn(root: string): readonly Drawn[] {
  const found: Drawn[] = []
  const asked = asking(root, {
    pageTypeSlug: READOUT,
    keys: ["slug", "label", "place", "attribute"],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const named = String(one["attribute"] ?? "")
    if (named === "") continue
    const attributeSlug = slugOf(named)
    const label = String(one["label"] ?? one["slug"] ?? "")
    const place = typeof one["place"] === "number" ? one["place"] : 0
    found.push({ label, place, attributeSlug })
  }
  found.sort((one, two) => one.place - two.place)
  return found
}

export function measuredIn(
  drawn: readonly Drawn[],
  totalOf: (slug: string) => number | null
): Read {
  const measured: Measured[] = []
  const unread: string[] = []
  for (const one of drawn) {
    const total = totalOf(one.attributeSlug)
    if (total === null) {
      unread.push(`${one.label} — ${NONE_KEPT}`)
      continue
    }
    measured.push({ label: one.label, level: levelOf(total), figure: flooredTo(total, PLACES) })
  }
  return { measured, unread }
}

export function slugsIn(kept: Readonly<Record<string, number>>): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const [readout, points] of Object.entries(kept)) {
    const slug = ATTRIBUTE_OF[readout]
    if (slug !== undefined) found.set(slug, points)
  }
  return found
}

export async function measureAttribute(argv: readonly string[], given: Given): Promise<Answer> {
  const taken = takenFor(argv, given.calledAs, page, [])
  if ("refused" in taken) return mistaking(taken.refused)
  const totalled = await totalAttributes(given.root)
  const found = slugsIn(totalled.kept)
  const read = measuredIn(drawnIn(given.root), (slug) => found.get(slug) ?? null)
  const unread = [...read.unread, ...totalled.unread]
  if (read.measured.length === 0) {
    return refusedBy([NOTHING_KEPT, ...unread], DATA)
  }
  const said = [...linesOf(read.measured)]
  return told(unread.length === 0 ? said : [...said, "", ...unread])
}
