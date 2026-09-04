import { statSync } from "node:fs"
import { join } from "node:path"
import { onceInCall } from "@akasha/command-system/during-call"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { everyOfType, listedById } from "@akasha/pages-system/index-reading"
import { uncommittedAt } from "@akasha/pages-system/page-file-name"
import { uncommittedIn } from "@akasha/pages-system/page-uncommitted"

export type Beside = Record<string, unknown>

export type Kind = "text" | "number" | "instant"

export type Carried = { readonly at: readonly string[]; readonly kind: Kind }

export const CARRIED: Readonly<Record<string, Carried>> = {
  "transcript-path": { at: ["transcriptPath"], kind: "text" },
  "rotated-session-uuid": { at: ["rotatedSessionUuid"], kind: "text" },
  model: { at: ["model"], kind: "text" },
  "context-tokens": { at: ["contextTokens"], kind: "number" },
  "supervisor-process": { at: ["supervisorProcess"], kind: "text" },
  "proxy-process": { at: ["proxy", "process"], kind: "text" },
  "proxy-port": { at: ["proxy", "port"], kind: "number" },
  "proxy-version": { at: ["proxy", "version"], kind: "text" },
  requestedAction: { at: ["request", "action"], kind: "text" },
  interruptMessage: { at: ["request", "message"], kind: "text" },
  restartArmedAt: { at: ["request", "armedAt"], kind: "instant" },
  "reexec-asked": { at: ["reExecAsk"], kind: "text" },
}

export const SUPERVISOR_PROCESS = "supervisor-process"

export const RECORDS: Readonly<Record<string, string>> = {
  "turn-pending": "turnPending",
  "turn-working": "turnWorking",
}

const PAGE_TYPE = "seat"

const SEAT_DIR = "seat-system/seats/pages/"

export function akashaRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function seatsThatExistInAkasha(): ReadonlyMap<string, string> {
  return onceInCall("akasha-seat-path-by-id", () => {
    const root = akashaRoot()
    const found = new Map<string, string>()
    for (const one of everyOfType(root, PAGE_TYPE)) {
      if (!one.path.startsWith(SEAT_DIR)) continue
      if (!found.has(one.id)) found.set(one.id, one.path)
    }
    return found
  })
}

export function akashaSeatPathForAgent(agentId: string): string | null {
  if (agentId === "") return null
  const held = seatsThatExistInAkasha().get(agentId)
  if (held !== undefined) return held
  const one = listedById(akashaRoot(), agentId)
  return one?.path.startsWith(SEAT_DIR) === true ? one.path : null
}

const SEAT_SUFFIX = ".seat.ts"

export function akashaSeatSlugOf(agentId: string): string | null {
  const page = akashaSeatPathForAgent(agentId)
  if (page === null) return null
  const name = page.slice(SEAT_DIR.length)
  return name.endsWith(SEAT_SUFFIX) ? name.slice(0, -SEAT_SUFFIX.length) : null
}

export function akashaSeatsThatExist(): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [id, path] of seatsThatExistInAkasha()) {
    const name = path.slice(SEAT_DIR.length)
    if (name.endsWith(SEAT_SUFFIX)) found.set(id, name.slice(0, -SEAT_SUFFIX.length))
  }
  return found
}

export function akashaSeatIdForName(name: string): string | null {
  const at = `${SEAT_DIR}${name}${SEAT_SUFFIX}`
  for (const [id, path] of seatsThatExistInAkasha()) if (path === at) return id
  return null
}

export function akashaBesideOf(agentId: string): Record<string, unknown> | null {
  const page = akashaSeatPathForAgent(agentId)
  if (page === null) return null
  const held = uncommittedIn(akashaRoot(), page)
  return held === null ? null : (held as Record<string, unknown>)
}

export function besideWrittenAtMs(page: string): number {
  const at = uncommittedAt(page)
  if (at === null) return 0
  const stood = statSync(join(akashaRoot(), at), { throwIfNoEntry: false })
  return stood === undefined ? 0 : stood.mtimeMs
}

export function akashaHolderProcessOf(agentId: string): string | null {
  const held = akashaValueOf(agentId, SUPERVISOR_PROCESS)
  return typeof held === "string" && held !== "" ? held : null
}

export function akashaValueOf(agentId: string, key: string): unknown {
  const where = CARRIED[key]
  if (where === undefined) return undefined
  const values = akashaBesideOf(agentId)
  if (values === null) return undefined
  const [one, two] = where.at
  if (one === undefined) return undefined
  const first = values[one]
  if (two === undefined) return first
  if (first === null || typeof first !== "object" || Array.isArray(first)) return undefined
  return (first as Record<string, unknown>)[two]
}
