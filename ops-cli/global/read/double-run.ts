import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { calling } from "../../../akasha/command-system/calling.module.code.ts"

const REPO = resolve(import.meta.dir, "../../..")

const HOME = `${REPO}/.git/data/double-run`

export type Held = { readonly oid: string; readonly seenAt: number }

export type Seen = ReadonlyMap<string, Held>

export function heldAt(path: string): Seen {
  const found = new Map<string, Held>()
  try {
    const raw = JSON.parse(readFileSync(path, "utf8")) as Record<string, Held>
    for (const [at, one] of Object.entries(raw)) {
      if (typeof one?.oid === "string") found.set(at, { oid: one.oid, seenAt: one.seenAt })
    }
  } catch {
    return found
  }
  return found
}

export function reachedIn(before: Seen, after: Seen): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [path, one] of after) {
    const was = before.get(path)
    if (was === undefined || was.seenAt !== one.seenAt) found.set(path, one.oid)
  }
  return found
}

export type Apart = {
  readonly path: string
  readonly old: string | null
  readonly new: string | null
}

export function apart(
  old: ReadonlyMap<string, string>,
  now: ReadonlyMap<string, string>
): readonly Apart[] {
  const found: Apart[] = []
  for (const path of new Set([...old.keys(), ...now.keys()])) {
    const one = old.get(path) ?? null
    const two = now.get(path) ?? null
    if (one !== two) found.push({ path, old: one, new: two })
  }
  return found.sort((a, b) => (a.path < b.path ? -1 : 1))
}

function named(path: string): string {
  return path.startsWith(`${REPO}/`) ? path.slice(REPO.length + 1) : path
}

function logAt(seat: string, now: Date): string {
  const at = `${HOME}/${seat}`
  mkdirSync(at, { recursive: true })
  const path = `${at}/${now.toISOString().slice(0, 10)}.jsonl`
  if (!existsSync(path)) writeFileSync(path, "")
  return path
}

export function doubleRun(
  argv: readonly string[],
  seat: string | null,
  old: ReadonlyMap<string, string>
): void {
  try {
    if (seat === null) return
    const record = `${HOME}/readings/${seat}.json`
    mkdirSync(`${HOME}/readings`, { recursive: true })
    const before = heldAt(record)
    const answer = calling(["read", ...argv], {
      root: `${REPO}/akasha`,
      seat,
      record,
      bodies: `${HOME}/bodies`,
      discardedTo: null,
      calledAs: "ops read",
      from: process.cwd(),
    })
    const now = reachedIn(before, heldAt(record))
    const path = logAt(seat, new Date())
    const at = new Date().toISOString()
    const lines =
      now.size === 0 && old.size > 0
        ? [
            JSON.stringify({
              at,
              path: "*",
              old: `${old.size} file(s)`,
              new: answer.refusals[0] ?? "nothing, and it refused nothing",
            }),
          ]
        : apart(old, now).map((one) =>
            JSON.stringify({ at, path: named(one.path), old: one.old, new: one.new })
          )
    if (lines.length > 0) appendFileSync(path, `${lines.join("\n")}\n`)
  } catch {
    return
  }
}
