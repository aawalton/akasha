import { rootOf } from "@akasha/command-system/rooting"
import { alive, type Holder } from "@akasha/file-system/lock-holder"
import { everyOfType, listedById, typeSlugOf } from "@akasha/indexes"
import { uncommittedIn } from "@akasha/pages-system/page-uncommitted"
import { type Value, valueAt } from "@akasha/pages-system/page-value"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const SEAT_DIR = "seat-system/seats/pages/"

const SEAT_TAIL = ".seat.ts"

const SESSION = "claudeCodeSessionUuid"

const HELD = "supervisorProcess"

const UNKNOWN = "-"

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

export function nameOf(page: string): string {
  const bare = page.startsWith(SEAT_DIR) ? page.slice(SEAT_DIR.length) : page
  return bare.endsWith(SEAT_TAIL) ? bare.slice(0, -SEAT_TAIL.length) : bare
}

export function seatPathForName(name: string): string {
  return `${SEAT_DIR}${name}${SEAT_TAIL}`
}

export function holderIn(said: unknown): Holder | null {
  if (typeof said !== "string" || said === "") return null
  const at = said.lastIndexOf("-")
  if (at < 1) return null
  const pid = Number.parseInt(said.slice(0, at), 10)
  const started = said.slice(at + 1)
  if (Number.isNaN(pid) || pid < 1) return null
  if (started === "" || started === UNKNOWN) return null
  return { pid, started }
}

export function supervisorOf(root: string, page: string): Holder | null {
  const beside = uncommittedIn(root, page)
  return beside === null ? null : holderIn((beside as Record<string, unknown>)[HELD])
}

export function supervisorAlive(root: string, page: string): boolean {
  const held = supervisorOf(root, page)
  return held !== null && alive(held)
}

export function seatPathForAgent(agentId: string, root: string = seatRoot()): string | null {
  if (agentId === "") return null
  for (const one of everyOfType(root, typeSlugOf(root, SEAT_TYPE))) {
    if (one.path.startsWith(SEAT_DIR) && one.id === agentId) return one.path
  }
  const held = listedById(root, agentId)
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
