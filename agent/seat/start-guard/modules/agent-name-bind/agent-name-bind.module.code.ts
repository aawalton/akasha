import { agentHolderProcess } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import {
  parseSeatProcKey,
  seatProcKeyPresence,
} from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  addressableByName,
  ancestorOfSelf,
  type Claiming,
  type Presence,
} from "akasha/agent/seat/start-guard/modules/seat-name-claim/seat-name-claim.module.code.ts"

function isPriorHolderCallerSeat(priorHolderId: string): boolean {
  const stated = agentHolderProcess(priorHolderId)
  const key = stated === null ? null : parseSeatProcKey(stated)
  if (key === null || seatProcKeyPresence(key) !== "present") return false
  return ancestorOfSelf(key.pid)
}

export function gatherAgentNameBindInput(args: {
  readonly bindingAgentId: string | null
  readonly name: string
  readonly priorHolderId: string | null
  readonly priorHolderPresence?: Presence
  readonly takeLiveName?: boolean
}): Claiming {
  const holder =
    args.priorHolderId === null
      ? null
      : { agentId: args.priorHolderId, presence: args.priorHolderPresence ?? "unknown" }
  return {
    claimingAgentId: args.bindingAgentId,
    name: args.name,
    addressable: addressableByName(args.name),
    holder,
    holderIsCallerSeat: args.priorHolderId !== null && isPriorHolderCallerSeat(args.priorHolderId),
    takeLiveName: args.takeLiveName ?? false,
  }
}
