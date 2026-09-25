import { seatByName } from "akasha/agent/seat/fleet/modules/seat-by-name/seat-by-name.module.code.ts"
import { isValidSeatName } from "akasha/agent/seat/fleet/modules/seat-handle/seat-handle.module.code.ts"
import { gatherAgentNameBindInput } from "akasha/agent/seat/name/modules/agent-name-bind/agent-name-bind.module.code.ts"
import {
  claimed,
  type Presence,
} from "akasha/agent/seat/name/modules/claim/seat-name-claim.module.code.ts"
import { inputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"

interface SetAgentNameBind {
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
