import { notices } from "akasha/agent/message/notice/modules/compose-notices/compose-notices.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { force } from "akasha/command/argument/pages/force.argument.ts"
import { notice } from "akasha/command/argument/pages/notice.argument.ts"
import { now } from "akasha/command/argument/pages/now.argument.ts"
import { seat } from "akasha/command/argument/pages/seat.argument.ts"
import { seatPrompt } from "akasha/command/argument/pages/seat-prompt.argument.ts"
import { startMode } from "akasha/command/argument/pages/start-mode.argument.ts"
import {
  faulted,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { ran } from "akasha/command/modules/seat-act-calling/seat-act-calling.module.code.ts"
import { seatResume as page } from "akasha/command/pages/seat/resume/seat-resume.command.ts"

const TARGET = "--agent-id"

export function noticeMissing(slug: string, composed: Readonly<Record<string, string>>): string {
  return `\`${slug}\` names no notice — the notices are ${Object.keys(composed).sort().join(", ")}`
}

export async function seatResume(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    force,
    notice,
    now,
    seatPrompt,
    seat,
    startMode,
  ])
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  let first = taken.seatPrompt
  if (taken.notice !== undefined) {
    let composed: Readonly<Record<string, string>>
    try {
      composed = notices()
    } catch (thrown) {
      return faulted(thrown)
    }
    const held = composed[taken.notice]
    if (held === undefined) return refusedBy([noticeMissing(taken.notice, composed)])
    first = held
  }
  const carried = [
    ...(first === undefined ? [] : [seatPrompt.said, first]),
    ...(taken.startMode === undefined ? [] : [startMode.said, taken.startMode]),
    ...(taken.now === true ? [now.said] : []),
    ...(taken.force === true ? [force.said] : []),
  ]
  const { default: resuming } = await import(
    "akasha/agent/seat/reviving/modules/seat-resume/seat-resume.module.code.ts"
  )
  return await ran(async (done) => {
    await resuming([TARGET, taken.seat, ...carried], done)
  })
}
