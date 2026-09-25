import {
  type Reading,
  strayNow,
} from "akasha/agent/modules/stray-process/stray-process.module.code.ts"
import {
  lineOf,
  type TimesOf,
  timesOf,
  unreadSaid,
} from "akasha/agent/modules/stray-sweeping/stray-sweeping.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { agentStrays as page } from "akasha/command/pages/agent/strays/agent-strays.command.ts"

const NOTHING = "nothing is stray"

type ReadingNow = () => Promise<Reading>

export function reportOf(read: Reading, times: TimesOf): readonly string[] {
  const named = read.strays.map((one) => lineOf(one, times))
  return [...(named.length === 0 ? [NOTHING] : named), unreadSaid(read.unread)]
}

export async function agentStrays(
  argv: readonly string[],
  given: Given,
  reading: ReadingNow = strayNow,
  times: TimesOf = timesOf
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async () => told(reportOf(await reading(), times)))
}
