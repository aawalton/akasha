import { linesOf, readingsIn } from "@akasha/agents/claude-account-measuring"
import { notesOf, refreshAll } from "@akasha/agents/claude-account-refreshing"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"

export async function measureClaudeAccountsUsage(
  _argv: readonly string[],
  given: Given
): Promise<Answer> {
  const notes = notesOf(await refreshAll(given.root, Date.now()))
  const readings = readingsIn(given.root)
  if (readings.length === 0) {
    return {
      report: [],
      refusals: [
        `no claude-account page sits under \`${given.root}\`, and every account holding a page ` +
          `is answered, so a fleet of none is the pages being wrong rather than a fleet`,
      ],
      code: 2,
    }
  }
  const said = [...linesOf(readings, Date.now())]
  return { report: notes.length === 0 ? said : [...said, "", ...notes], refusals: [], code: 0 }
}
