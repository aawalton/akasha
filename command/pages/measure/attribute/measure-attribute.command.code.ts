import { pointsTotalKept } from "akasha/alan/attribute/modules/points/attribute-points.module.code.ts"
import { levelOf } from "akasha/alan/attribute/properties/attribute-level.computed-property.code.ts"
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

export function measureAttribute(argv: readonly string[], given: Given): Answer {
  const taken = takenFor(argv, given.calledAs, page, [])
  if ("refused" in taken) return mistaking(taken.refused)
  const read = measuredIn(drawnIn(given.root), (slug) => pointsTotalKept(given.root, slug))
  if (read.measured.length === 0) {
    return refusedBy([NOTHING_KEPT, ...read.unread], DATA)
  }
  const said = [...linesOf(read.measured)]
  return told(read.unread.length === 0 ? said : [...said, "", ...read.unread])
}
