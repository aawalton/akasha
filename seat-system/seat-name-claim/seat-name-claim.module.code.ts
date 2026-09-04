import { readFileSync } from "node:fs"
import { lowerUuid } from "@akasha/pages-system/name-format/lower-uuid"
import { statedIn } from "@akasha/utils-process/proc-reading"
import { seatPathForName, supervisorAlive } from "../seat-reading/seat-reading.module.code.ts"

const UUID_HEX = 32

const HEX_ONLY = /^[0-9a-f]+$/

const NAME_SHAPE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/

const NAME_HAS_NON_HEX = /[g-z-]/

const NAME_MIN = 2

const NAME_MAX = 128

const HEX_ONLY_NAME_MAX = 7

const ANCESTRY_LIMIT = 32

const TAKE_LIVE = "--take-live-name"

export type Presence = "present" | "absent" | "unknown"

export type Refusal = "unaddressable" | "live-holder"

export type Holder = {
  readonly agentId: string
  readonly presence: Presence
}

export type Claiming = {
  readonly claimingAgentId: string | null
  readonly name: string
  readonly addressable: boolean
  readonly holder: Holder | null
  readonly holderIsCallerSeat: boolean
  readonly takeLiveName: boolean
}

export type Claim =
  | { readonly allow: true }
  | { readonly allow: false; readonly cause: Refusal; readonly said: string }

export function nameShaped(named: string): boolean {
  if (named.length < NAME_MIN || named.length > NAME_MAX) return false
  if (!NAME_SHAPE.test(named)) return false
  return named.length <= HEX_ONLY_NAME_MAX || NAME_HAS_NON_HEX.test(named)
}

export function addressableByName(named: string): boolean {
  if (lowerUuid(named.toLowerCase())) return false
  const bare = named.replace(/-/g, "").toLowerCase()
  if (bare.length > 0 && bare.length <= UUID_HEX && HEX_ONLY.test(bare)) return false
  return nameShaped(named)
}

function refused(cause: Refusal, said: string): Claim {
  return { allow: false, cause, said }
}

export function claimed(asked: Claiming): Claim {
  const { claimingAgentId, name, holder } = asked
  if (!asked.addressable) {
    return refused(
      "unaddressable",
      `\`${name}\` is not reachable by name: it reads as an id, so taking it leaves this seat ` +
        "unreachable by every name-keyed sweep. It is admitted by the shape check only because a " +
        "short hex-ish name is legal. Pick a name carrying a letter outside a-f"
    )
  }
  if (holder !== null && holder.agentId === claimingAgentId) return { allow: true }
  if (
    holder !== null &&
    holder.presence === "present" &&
    !asked.holderIsCallerSeat &&
    !asked.takeLiveName
  ) {
    return refused(
      "live-holder",
      `\`${name}\` is held by seat ${holder.agentId}, which has a process in it right now. One ` +
        "name reaches one seat, so taking it would leave two seats spelling one name: the mail " +
        "waiting for it arrives here, and the next page write lands on the file that seat is " +
        `named by. Stop it with \`akasha seat supervisor stop ${name}\`, or say \`${TAKE_LIVE}\` ` +
        "to take the name from it deliberately"
    )
  }
  return { allow: true }
}

export type Ancestry = {
  readonly parentOf: (pid: number) => number | null
  readonly self: () => number
}

export function parentOf(pid: number): number | null {
  let stat: string
  try {
    stat = readFileSync(`/proc/${String(pid)}/stat`, "utf8")
  } catch {
    return null
  }
  return statedIn(stat).ppid
}

export const ANCESTRY: Ancestry = { parentOf, self: () => process.pid }

export function ancestorOfSelf(pid: number, how: Ancestry = ANCESTRY): boolean {
  let cursor: number | null = how.self()
  for (let depth = 0; depth < ANCESTRY_LIMIT && cursor !== null; depth += 1) {
    if (cursor === pid) return true
    if (cursor === 1) return false
    cursor = how.parentOf(cursor)
  }
  return false
}

export function presenceOf(root: string, name: string): Presence {
  return supervisorAlive(root, seatPathForName(name)) ? "present" : "absent"
}
