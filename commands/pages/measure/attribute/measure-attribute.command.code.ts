import { pointsTotalKept } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { levelOf } from "akasha/alan/attributes/properties/attribute-level.computed-property.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  flooredTo,
  linesOf,
  type Measured,
  PLACES,
} from "akasha/commands/pages/measure/measure-tabling/measure-tabling.module.code.ts"
import { asking } from "akasha/pages/service/page-asking/page-asking.module.code.ts"

const READOUT = "readout"

const GROUP = "attributes"

const NOTHING_KEPT =
  "no attribute carries a total, so there is nothing to say. A figure Alan did not earn " +
  "would be a lie, and no figure at all is not a figure of zero."

const NONE_KEPT = "no total is kept beside this attribute's page"

export type Drawn = {
  readonly label: string
  readonly place: number
  readonly attributeSlug: string
}

export type Read = {
  readonly measured: readonly Measured[]
  readonly unread: readonly string[]
}

export function drawnIn(root: string): readonly Drawn[] {
  const found: Drawn[] = []
  const asked = asking(root, {
    pageTypeSlug: READOUT,
    keys: ["slug", "label", "place", "groups", "attribute"],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const groups = one["groups"]
    if (!Array.isArray(groups) || !groups.includes(GROUP)) continue
    const attributeSlug = String(one["attribute"] ?? "")
    if (attributeSlug === "") continue
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

export function measureAttribute(_argv: readonly string[], given: Given): Answer {
  const read = measuredIn(drawnIn(given.root), (slug) => pointsTotalKept(given.root, slug))
  if (read.measured.length === 0) {
    return refusedBy([NOTHING_KEPT, ...read.unread], DATA)
  }
  const said = [...linesOf(read.measured)]
  return told(read.unread.length === 0 ? said : [...said, "", ...read.unread])
}
