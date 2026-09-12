import {
  linesOf,
  readingsIn,
} from "akasha/agents/claude-accounts/modules/measuring/claude-account-measuring.module.code.ts"
import {
  notesOf,
  refreshAll,
} from "akasha/agents/claude-accounts/modules/refreshing/claude-account-refreshing.module.code.ts"
import {
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

export async function measureClaudeAccountUsage(
  _argv: readonly string[],
  given: Given
): Promise<Answer> {
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
