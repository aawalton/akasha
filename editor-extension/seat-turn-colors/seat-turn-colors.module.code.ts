import * as path from "node:path"
import {
  akashaRoot,
  commandPath,
  repositoryPath,
  runCommand,
} from "../harness-call/harness-call.module.code.ts"
import { colorNamed } from "../palette/palette.module.code.ts"

const CALL_TIMEOUT_MS = 30_000

const MAX_BUFFER = 4 * 1024 * 1024

const COMMAND = "agent-turn-colors"

const AKASHA_SEAT_DIR = "seat-system/seats/pages"

export const SEAT_SIDECAR_GLOB = "*.uncommitted.ts"

export function seatDirs(): readonly string[] {
  return [repositoryPath(seatPagesDir())]
}

export function seatPagesDir(): string {
  return path.join(akashaRoot(), AKASHA_SEAT_DIR)
}

export function colorsOf(named: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [id, name] of Object.entries(named)) {
    const color = colorNamed(name)
    if (color !== undefined) {
      found.set(id, color)
    }
  }
  return found
}

export function readTurnColorAnswer(answered: unknown): Readonly<Record<string, string>> {
  if (answered === null || typeof answered !== "object") {
    throw new Error(`${COMMAND}: the answer is not an object, so it names no color`)
  }
  const held = answered as { colors?: unknown; colours?: unknown }
  const named = held.colors ?? held.colours
  if (named === null || named === undefined || typeof named !== "object") {
    throw new Error(`${COMMAND}: the answer carries neither a \`colors\` nor a \`colours\` record`)
  }
  const found: Record<string, string> = {}
  for (const [id, color] of Object.entries(named as Record<string, unknown>)) {
    if (typeof color !== "string" || color === "") {
      throw new Error(`${COMMAND}: the color answered for ${id} is no name`)
    }
    found[id] = color
  }
  return found
}

export async function readSeatTurnColors(
  agentIds: readonly string[]
): Promise<ReadonlyMap<string, string>> {
  if (agentIds.length === 0) {
    return new Map<string, string>()
  }
  const stdout = await runCommand(commandPath(COMMAND), agentIds, {
    timeout: CALL_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  })
  let answered: unknown
  try {
    answered = JSON.parse(stdout)
  } catch (err) {
    throw new Error(`${COMMAND} did not print JSON: ${String(err)}`)
  }
  return colorsOf(readTurnColorAnswer(answered))
}
