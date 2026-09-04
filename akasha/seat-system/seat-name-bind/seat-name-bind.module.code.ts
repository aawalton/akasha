import { inputError } from "@akasha/errors-core/exit-code"
import { gatherAgentNameBindInput } from "../agent-name-bind/agent-name-bind.module.code.ts"
import { seatByName } from "../seat-by-name/seat-by-name.module.code.ts"
import { isValidSeatName } from "../seat-handle/seat-handle.module.code.ts"
import { claimed, type Presence } from "../seat-name-claim/seat-name-claim.module.code.ts"

export interface SetAgentNameBind {
  readonly priorHolderPresence?: Presence
  readonly takeLiveName?: boolean
}

export async function refuseSeatName(
  agentId: string,
  name: string,
  bind: SetAgentNameBind = {}
): Promise<void> {
  if (!isValidSeatName(name)) {
    throw inputError(`invalid agent name: ${name}`)
  }
  const prior = seatByName(name)
  const priorHolderId = prior !== null && prior.id !== agentId ? prior.id : null
  const input = gatherAgentNameBindInput({
    bindingAgentId: agentId,
    name,
    priorHolderId,
    ...(bind.priorHolderPresence === undefined
      ? {}
      : { priorHolderPresence: bind.priorHolderPresence }),
    ...(bind.takeLiveName === undefined ? {} : { takeLiveName: bind.takeLiveName }),
  })
  const decision = claimed(input)
  if (!decision.allow) {
    throw inputError(`refuseSeatName refused (${decision.cause}): ${decision.said}`)
  }
}

export async function mintNamedAgent(name: string): Promise<string> {
  const agentId = Bun.randomUUIDv7()
  await refuseSeatName(agentId, name)
  return agentId
}
