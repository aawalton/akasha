import { readFileSync } from "node:fs"
import {
  parseSeatProcKey,
  type SeatPresence,
  statedProcessPresence,
} from "@akasha/seat-system/seat-proc-key"
import { parse } from "yaml"
import {
  akashaHolderProcessOf,
  akashaSeatIdForName,
  akashaSeatPathForAgent,
  akashaSeatSlugOf,
  akashaSeatsThatExist,
} from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"

const FRONTMATTER_FENCE = "---"

export function frontmatterIn(raw: string): Record<string, unknown> | null {
  if (!raw.startsWith(`${FRONTMATTER_FENCE}\n`)) return null
  const close = raw.indexOf(`\n${FRONTMATTER_FENCE}`, FRONTMATTER_FENCE.length)
  if (close === -1) return null
  let parsed: unknown
  try {
    parsed = parse(raw.slice(FRONTMATTER_FENCE.length + 1, close + 1))
  } catch {
    return null
  }
  return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : null
}

export function frontmatterOf(pagePath: string): Record<string, unknown> | null {
  try {
    return frontmatterIn(readFileSync(pagePath, "utf8"))
  } catch {
    return null
  }
}

export function seatPageAgents(): readonly string[] {
  return [...akashaSeatsThatExist().keys()].sort()
}

export function seatIdForName(name: string): string | null {
  return akashaSeatIdForName(name)
}

export function agentHolderProcess(agentId: string): string | null {
  return akashaHolderProcessOf(agentId)
}

export function agentPresence(agentId: string): SeatPresence {
  if (akashaSeatPathForAgent(agentId) === null) return "absent"
  return statedProcessPresence(akashaHolderProcessOf(agentId))
}

export function agentIsPresent(agentId: string): boolean {
  return agentPresence(agentId) === "present"
}

export function seatNameForAgent(agentId: string): string | null {
  if (agentId === "") return null
  return akashaSeatSlugOf(agentId)
}

export function seatNameForSupervisorPid(pid: number): string | null {
  for (const [agentId, name] of akashaSeatsThatExist()) {
    const stated = akashaHolderProcessOf(agentId)
    if (stated === null) continue
    const key = parseSeatProcKey(stated)
    if (key !== null && key.pid === pid) return name
  }
  return null
}
