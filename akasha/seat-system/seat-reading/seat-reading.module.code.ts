import { rootOf } from "../../command-system/rooting/rooting.module.code.ts"
import {
  type Value,
  valueAt,
} from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfTypeAnswered,
  standingById,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"

const PAGE_TYPE = "seat"

const SEAT_DIR = "akasha/seat-system/seat/seats/"

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
  "initiative-slug": "initiativeSlug",
  "transcript-path": "transcriptPath",
  "claude-code-session-uuid": "claudeCodeSessionUuid",
}

export function seatRoot(): string {
  return rootOf(import.meta.dir)
}

export function seatPathForAgent(agentId: string, root: string = seatRoot()): string | null {
  if (agentId === "") return null
  for (const one of everyOfTypeAnswered(root, PAGE_TYPE)) {
    if (one.path.startsWith(SEAT_DIR) && one.id === agentId) return one.path
  }
  const held = standingById(root, agentId)
  return held?.path.startsWith(SEAT_DIR) === true ? held.path : null
}

export function seatStating(
  agentId: string,
  root: string = seatRoot()
): Record<string, unknown> | null {
  const page = seatPathForAgent(agentId, root)
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

export function seatSaying(agentId: string, key: string, root: string = seatRoot()): string {
  const held = seatStating(agentId, root)?.[key]
  if (typeof held === "string") return held
  if (typeof held === "number" && Number.isFinite(held)) return String(held)
  return ""
}

function said(argv: readonly string[]): string {
  const [agentId, ...keys] = argv
  if (agentId === undefined || keys.length === 0) return ""
  const root = seatRoot()
  const stating = seatStating(agentId, root)
  if (stating === null) return keys.map(() => "").join("\n")
  return keys
    .map((key) => {
      const one = stating[key]
      return typeof one === "string" ? one : typeof one === "number" ? String(one) : ""
    })
    .join("\n")
}

if (import.meta.main) process.stdout.write(`${said(process.argv.slice(2))}\n`)
