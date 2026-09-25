import { decideRemoteControl } from "akasha/agent/claude-code/remote-control/modules/decide/claude-code-remote-control-decide.module.code.ts"

type SeatSpawnDecisions = {
  readonly remoteControl: boolean
}

export async function resolveSeatSpawnDecisions(
  _agentId: string | null,
  opts: { headless: boolean }
): Promise<SeatSpawnDecisions> {
  return { remoteControl: decideRemoteControl({ headless: opts.headless }) }
}
