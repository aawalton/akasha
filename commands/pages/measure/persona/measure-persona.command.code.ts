import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measurePersona as page } from "akasha/commands/pages/measure/persona/measure-persona.command.ts"
import {
  flooredTo,
  linesOf,
  type Measured,
  PLACES,
} from "akasha/commands/pages/measure/tabling/measure-tabling.module.code.ts"
import { asking } from "akasha/pages/service/page-asking/page-asking.module.code.ts"
import { pointsTotalKept } from "akasha/personas/points/keeping/persona-points-keeping.module.code.ts"
import { levelOf } from "akasha/personas/properties/persona-relationship-level.computed-property.code.ts"
import {
  displayNameOf,
  personasStanding,
} from "akasha/personas/reading/persona-reading.module.code.ts"

const CLOSENESS_LEVEL = "closeness-level"

const LEVEL = "level"

const POINTS_TO_HERE = "pointsToHere"

const NOTHING_KEPT =
  "no persona carries a total, so there is nothing to say. A figure Alan did not earn her would " +
  "be a lie, and no figure at all is not a figure of zero."

export type Named = { readonly slug: string; readonly label: string; readonly path: string }

function rungsIn(root: string): ReadonlyMap<number, number> {
  const found = new Map<number, number>()
  const asked = asking(root, {
    pageTypeSlug: CLOSENESS_LEVEL,
    keys: [LEVEL, POINTS_TO_HERE],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const rung = one[LEVEL]
    const points = one[POINTS_TO_HERE]
    if (typeof rung === "number" && typeof points === "number") found.set(rung, points)
  }
  return found
}

export function measuredIn(
  named: readonly Named[],
  totalOf: (one: Named) => number | null,
  rungAt: (rung: number) => number | null
): readonly Measured[] {
  const found: Measured[] = []
  for (const one of named) {
    const total = totalOf(one)
    if (total === null) continue
    found.push({
      label: one.label,
      level: levelOf(total, rungAt),
      figure: flooredTo(total, PLACES),
    })
  }
  return [...found].sort(
    (one, two) =>
      two.figure - one.figure || (one.label < two.label ? -1 : one.label > two.label ? 1 : 0)
  )
}

export function untotalledOf(named: number, measured: number): readonly string[] {
  const left = named - measured
  if (left <= 0) return []
  return ["", `${String(left)} ${left === 1 ? "persona carries" : "personas carry"} no total yet`]
}

export function measurePersona(argv: readonly string[], given: Given): Answer {
  const taken = takenFor(argv, given.calledAs, page, [])
  if ("refused" in taken) return mistaking(taken.refused)
  const named = personasStanding(given.root).map((one) => ({
    slug: one.slug,
    label: displayNameOf(one.slug),
    path: one.path,
  }))
  const rungs = rungsIn(given.root)
  const measured = measuredIn(
    named,
    (one) => pointsTotalKept(given.root, one),
    (rung) => rungs.get(rung) ?? null
  )
  if (measured.length === 0) {
    return refusedBy([NOTHING_KEPT], DATA)
  }
  return told([...linesOf(measured), ...untotalledOf(named.length, measured.length)])
}
