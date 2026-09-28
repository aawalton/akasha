import { addPageProperty } from "akasha/change/mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.ts"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { turnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.ts"

const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

const RESTATE = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const ADD = `${changeMechanicalFileContent.slug}/${addPageProperty.slug}` as const

const ENDS_AT = exportedAs(turnEndsAt.propertySlug)

const STATED = new RegExp(`^\\s*${ENDS_AT}:`, "m")

const BREAK = "\n"

export type Settled = { readonly answered: unknown }

function timedFor(turn: string, endsAt: string, turnText: string | null): readonly Asking[] {
  if (turnText === null || turnText.includes(`${ENDS_AT}: ${JSON.stringify(endsAt)}`)) return []
  if (STATED.test(turnText)) return [{ at: RESTATE, given: { at: turn, key: ENDS_AT, to: endsAt } }]
  return [{ at: ADD, given: { at: turn, key: ENDS_AT, value: JSON.stringify(endsAt) } }]
}

export function askedFor(
  outcomes: string,
  turn: string,
  roll: Settled,
  turnText: string | null
): readonly Asking[] {
  const content = `${JSON.stringify(roll)}${BREAK}`
  const appended: Asking = { at: APPEND, given: { at: outcomes, content } }
  const endsAt = isRecord(roll.answered) ? roll.answered[ENDS_AT] : undefined
  if (typeof endsAt !== "string") return [appended]
  return [appended, ...timedFor(turn, endsAt, turnText)]
}
