import { existsSync } from "node:fs"
import { join } from "node:path"
import { pathIn } from "akasha/agents/subagents/modules/page-naming/subagent-page-naming.module.code.ts"
import { stoppedBeside } from "akasha/agents/subagents/modules/presence/subagent-presence.module.code.ts"
import { subagentStopped } from "akasha/agents/subagents/properties/subagent-stopped.boolean-property.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { subagent } from "akasha/commands/arguments/pages/subagent.argument.ts"
import {
  DATA,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { agentSubagentStop as page } from "akasha/commands/pages/agent/subagent-stop/agent-subagent-stop.command.ts"
import { mergeUncommitted } from "akasha/pages/modules/uncommitted/page-uncommitted.module.code.ts"

const STOPPED = subagentStopped.propertySlug

export const REACHES =
  "the stop reaches it at its next model turn, and one inside a tool call finishes that call first"

export function agentSubagentStop(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [subagent])
  if ("refused" in read) return refusedBy(read.refused)
  const name = read.taken.subagent
  const at = pathIn(given.root, name)
  if (!existsSync(join(given.root, at))) {
    return refused(
      `no subagent named \`${name}\` holds a page under \`${given.root}\`, so there is nothing to stop`,
      DATA
    )
  }
  if (stoppedBeside(given.root, at)) {
    return told([`\`${name}\` is stopped already, so nothing was written`])
  }
  mergeUncommitted(given.root, at, { [STOPPED]: true })
  return told([`\`${name}\` is stopped: ${REACHES}`])
}
