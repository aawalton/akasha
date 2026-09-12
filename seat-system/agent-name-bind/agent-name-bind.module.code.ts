import { readFileSync } from "node:fs"
import {
  addressableByName,
  type Claiming,
  type Presence,
} from "akasha/agents/seats/modules/name-claim/seat-name-claim.module.code.ts"
import { agentHolderProcess } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import {
  parseSeatProcKey,
  seatProcKeyPresence,
} from "akasha/agents/seats/modules/proc-key/seat-proc-key.module.code.ts"

const ANCESTRY_DEPTH_LIMIT = 32

function readParentPid(pid: number): number | null {
  let line: string
  try {
    line = readFileSync(`/proc/${pid}/stat`, "utf8")
  } catch {
    return null
  }
  const close = line.lastIndexOf(")")
  if (close === -1) return null
  const fields = line.slice(close + 2).split(" ")
  const ppid = Number(fields[1])
  return Number.isInteger(ppid) && ppid > 0 ? ppid : null
}

export function isAncestorOfSelf(pid: number): boolean {
  let cursor: number | null = process.pid
  for (let depth = 0; depth < ANCESTRY_DEPTH_LIMIT && cursor !== null; depth++) {
    if (cursor === pid) return true
    if (cursor === 1) return false
    cursor = readParentPid(cursor)
  }
  return false
}

export function isPriorHolderCallerSeat(priorHolderId: string): boolean {
  const stated = agentHolderProcess(priorHolderId)
  const key = stated === null ? null : parseSeatProcKey(stated)
  if (key === null || seatProcKeyPresence(key) !== "present") return false
  return isAncestorOfSelf(key.pid)
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
