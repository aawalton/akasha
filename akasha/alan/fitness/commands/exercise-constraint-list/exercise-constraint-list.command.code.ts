import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { chosenIn } from "@akasha/exercise-access/exercise-choosing"
import { boolIn, rowsFor, textIn, textsIn, titleOf } from "@akasha/exercise-access/exercise-rows"
import { CONSTRAINT_FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { JSON_SAID, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const COACHING_CONSTRAINT = "coaching-constraint"

const FOCUS = "--focus"

const ALL = "--all"

const AT_MOST = 200

const EVERY_FOCUS = "all"

const NOTHING = "-"

export async function exerciseConstraintList(
  argv: readonly string[],
  _given: Given
): Promise<Answer> {
  const reading = saidIn(argv, [FOCUS], [ALL, JSON_SAID], 0)
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const focusSaid = said.held.get(FOCUS)
  let focus: string | null = null
  if (focusSaid !== undefined) {
    const chosen = chosenIn(FOCUS, focusSaid, CONSTRAINT_FOCUS_OPTIONS)
    if ("refused" in chosen) return refused(chosen.refused, INPUT)
    focus = chosen.chosen
  }
  const all = said.bare.has(ALL)
  const json = said.bare.has(JSON_SAID)

  const found = await rowsFor({
    pageTypeSlug: COACHING_CONSTRAINT,
    order: [{ by: "coachingConstraintSortOrder", dir: "asc" }],
    limit: AT_MOST,
  })
  if ("unread" in found) return refused(found.unread, DATA)

  const items = found.rows
    .map((row) => ({
      id: row.id,
      title: titleOf(row),
      kind: textIn(row, "coachingConstraintKind") ?? null,
      focusTags: textsIn(row, "focusTags"),
      active: boolIn(row, "coachingConstraintActive") ?? true,
    }))
    .filter((one) => all || one.active)
    .filter(
      (one) =>
        focus === null || one.focusTags.includes(EVERY_FOCUS) || one.focusTags.includes(focus)
    )

  if (json) return { report: [JSON.stringify({ items })], refusals: [], code: 0 }
  if (items.length === 0)
    return { report: ["no coaching constraint stands"], refusals: [], code: 0 }
  return {
    report: items.map((one) => {
      const tags = one.focusTags.length > 0 ? one.focusTags.join(",") : NOTHING
      return `${one.kind ?? NOTHING}\t${tags}\t${one.title}`
    }),
    refusals: [],
    code: 0,
  }
}
