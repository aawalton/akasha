import { createHash } from "node:crypto"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

const DIR_ENV = "PAGE_LANDING_JOURNAL_DIR"

const EXT = ".json"

const STATE = [".local", "state", "page-landings"]

const NAMED = 16

export function journalDir(): string {
  const named = process.env[DIR_ENV]
  if (named !== undefined && named.trim() !== "") return named
  return join(process.env.HOME ?? homedir(), ...STATE)
}

export interface Queued {
  readonly act: string
  readonly at: number
}

export interface Journal {
  readonly root: string
  readonly pid: number
  readonly attempts: number
  readonly reason: string | null
  readonly paths: Readonly<Record<string, Queued>>
}

function fileFor(root: string): string {
  return join(
    journalDir(),
    `${createHash("sha1").update(root).digest("hex").slice(0, NAMED)}${EXT}`
  )
}

export function writeJournal(one: Journal): void {
  mkdirSync(journalDir(), { recursive: true })
  const path = fileFor(one.root)
  const staging = `${path}.${process.pid}.staging`
  writeFileSync(staging, `${JSON.stringify(one)}\n`)
  renameSync(staging, path)
}

export function clearJournal(root: string): void {
  try {
    rmSync(fileFor(root))
  } catch {}
}

function journalIn(text: string): Journal | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return null
  }
  if (typeof parsed !== "object" || parsed === null) return null
  const one = parsed as Record<string, unknown>
  const root = one.root
  const pid = one.pid
  const paths = one.paths
  if (typeof root !== "string" || root === "") return null
  if (typeof pid !== "number") return null
  if (typeof paths !== "object" || paths === null) return null
  const held: Record<string, Queued> = {}
  for (const [relPath, value] of Object.entries(paths as Record<string, unknown>)) {
    if (typeof value !== "object" || value === null) continue
    const each = value as Record<string, unknown>
    if (typeof each.act !== "string" || typeof each.at !== "number") continue
    held[relPath] = { act: each.act, at: each.at }
  }
  if (Object.keys(held).length === 0) return null
  return {
    root,
    pid,
    attempts: typeof one.attempts === "number" ? one.attempts : 0,
    reason: typeof one.reason === "string" ? one.reason : null,
    paths: held,
  }
}

export function readJournals(): readonly Journal[] {
  let names: readonly string[]
  try {
    names = readdirSync(journalDir())
      .filter((one) => one.endsWith(EXT))
      .sort()
  } catch {
    return []
  }
  const found: Journal[] = []
  for (const name of names) {
    let text: string
    try {
      text = readFileSync(join(journalDir(), name), "utf8")
    } catch {
      continue
    }
    const one = journalIn(text)
    if (one !== null) found.push(one)
  }
  return found
}

export function writerAlive(pid: number): boolean {
  if (!Number.isFinite(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (thrown) {
    return (thrown as NodeJS.ErrnoException).code !== "ESRCH"
  }
}

export function rootStands(root: string): boolean {
  return existsSync(root)
}
