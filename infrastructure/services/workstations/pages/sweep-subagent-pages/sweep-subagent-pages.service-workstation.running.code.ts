import { agentSubagentSweep } from "akasha/commands/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts"
import { akashaRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"

const REMOVE = "--remove"

const CALLED_AS = "akasha agent subagent-sweep"

const WENT = " went"

export async function runService(): Promise<void> {
  const root = akashaRoot()
  const said = await agentSubagentSweep([REMOVE], {
    root,
    calledAs: CALLED_AS,
    from: root,
    writer: null,
    agentId: null,
  })
  for (const one of said.report) if (one.endsWith(WENT)) process.stdout.write(`${one}\n`)
  for (const one of said.refusals) process.stdout.write(`${one}\n`)
}
