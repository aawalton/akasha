import { rootOf } from "../../command-system/rooting/rooting.module.code.ts"
import {
  everyOfType,
  standingById,
  typeSlugOf,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { type Value, valueAt } from "../../pages-system/page/page-value/page-value.module.code.ts"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const SEAT_DIR = "akasha/seat-system/seat/seats/"

const SESSION = "claudeCodeSessionUuid"

const STATED: Readonly<Record<string, string>> = {
  id: "id",
  slug: "slug",
  "persona-slug": "personaSlug",
  "domain-slug": "assignmentSlug",
  "role-slug": "roleSlug",
  "person-slug": "personSlug",
  "principal-seat-name": "principalSeatName",
  "start-mode": "startMode",
  "registration-account": "registrationAccount",
  "transcript-path": "transcriptPath",
  "claude-code-session-uuid": "claudeCodeSessionUuid",
}

export function seatRoot(): string {
  return rootOf(import.meta.dir)
}

export function seatPathForAgent(agentId: string, root: string = seatRoot()): string | null {
  if (agentId === "") return null
  for (const one of everyOfType(root, typeSlugOf(root, SEAT_TYPE))) {
    if (one.path.startsWith(SEAT_DIR) && one.id === agentId) return one.path
  }
  const held = standingById(root, agentId)
  return held?.path.startsWith(SEAT_DIR) === true ? held.path : null
}

export function seatPathForSession(sessionUuid: string, root: string = seatRoot()): string | null {
  if (sessionUuid === "") return null
  for (const one of everyOfType(root, typeSlugOf(root, SEAT_TYPE))) {
    if (!one.path.startsWith(SEAT_DIR)) continue
    const held: Value | null = valueAt(one.path, root)
    if (held === null) continue
    if ((held as Record<string, unknown>)[SESSION] === sessionUuid) return one.path
  }
  return null
}

export function seatPathFor(handle: string, root: string = seatRoot()): string | null {
  return seatPathForAgent(handle, root) ?? seatPathForSession(handle, root)
}

export function seatStating(
  handle: string,
  root: string = seatRoot()
): Record<string, unknown> | null {
  const page = seatPathFor(handle, root)
  if (page === null) return null
  const held: Value | null = valueAt(page, root)
  if (held === null) return null
  const said: Record<string, unknown> = {}
  for (const [key, from] of Object.entries(STATED)) {
    const one = (held as Record<string, unknown>)[from]
    if (one !== undefined && one !== null && one !== "") said[key] = one
  }
  return said
}

export function seatSaying(handle: string, key: string, root: string = seatRoot()): string {
  const held = seatStating(handle, root)?.[key]
  if (typeof held === "string") return held
  if (typeof held === "number" && Number.isFinite(held)) return String(held)
  return ""
}

function said(argv: readonly string[]): string {
  const [handle, ...keys] = argv
  if (handle === undefined || keys.length === 0) return ""
  const root = seatRoot()
  const stating = seatStating(handle, root)
  if (stating === null) return keys.map(() => "").join("\n")
  return keys
    .map((key) => {
      const one = stating[key]
      return typeof one === "string" ? one : typeof one === "number" ? String(one) : ""
    })
    .join("\n")
}

if (import.meta.main) process.stdout.write(`${said(process.argv.slice(2))}\n`)
