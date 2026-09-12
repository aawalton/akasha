import {
  linesOf,
  readingsIn,
} from "akasha/agents/claude-accounts/modules/measuring/claude-account-measuring.module.code.ts"
import {
  notesOf,
  refreshAll,
} from "akasha/agents/claude-accounts/modules/refreshing/claude-account-refreshing.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measureClaudeAccountUsage as page } from "akasha/commands/pages/measure/claude-account/usage/measure-claude-account-usage.command.ts"

export async function measureClaudeAccountUsage(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  const notes = notesOf(await refreshAll(given.root, Date.now()))
  const readings = readingsIn(given.root)
  if (readings.length === 0) {
    return refusedBy(
      [
        `no claude-account page sits under \`${given.root}\`, and every account holding a page ` +
          `is answered, so a fleet of none is the pages being wrong rather than a fleet`,
      ],
      DATA
    )
  }
  const said = [...linesOf(readings, Date.now())]
  return told(notes.length === 0 ? said : [...said, "", ...notes])
}
