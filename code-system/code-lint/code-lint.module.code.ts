import { existsSync } from "node:fs"
import { join } from "node:path"
import { ran } from "@akasha/utils-run/running"

export const BINARY = "node_modules/.bin/biome"

const CHECKS = "check"

const REPORTER = "--reporter=json"

const CEILING = "--max-diagnostics=100000"

const DIAGNOSTICS = "diagnostics"

const SUMMARY = "summary"

const ERRORS = "errors"

const LOCATION = "location"

const START = "start"

const PATH = "path"

const LINE = "line"

const COLUMN = "column"

const CATEGORY = "category"

const MESSAGE = "message"

const UNRUN = -1

const SAID_AT_MOST = 240

const NAMED_AT_MOST = 100000

export type Found = {
  readonly path: string
  readonly line: number
  readonly column: number
  readonly rule: string
  readonly said: string
}

export type Read = {
  readonly errors: number
  readonly found: readonly Found[]
}

export type Linted = {
  readonly code: number
  readonly errors: number
  readonly found: readonly Found[]
  readonly failed: string | null
}

function objectIn(line: string): Record<string, unknown> | null {
  try {
    const held = JSON.parse(line) as unknown
    if (typeof held !== "object" || held === null || Array.isArray(held)) return null
    return held as Record<string, unknown>
  } catch {
    return null
  }
}

function countIn(held: unknown, named: string): number {
  if (typeof held !== "object" || held === null) return 0
  const said = (held as Record<string, unknown>)[named]
  return typeof said === "number" && Number.isFinite(said) ? said : 0
}

function wordIn(held: Record<string, unknown>, named: string): string {
  const said = held[named]
  return typeof said === "string" ? said : ""
}

function foundOf(held: unknown): Found | null {
  if (typeof held !== "object" || held === null) return null
  const said = held as Record<string, unknown>
  const at = said[LOCATION]
  if (typeof at !== "object" || at === null) return null
  const where = at as Record<string, unknown>
  const path = where[PATH]
  if (typeof path !== "string") return null
  return {
    path,
    line: countIn(where[START], LINE),
    column: countIn(where[START], COLUMN),
    rule: wordIn(said, CATEGORY),
    said: wordIn(said, MESSAGE),
  }
}

export function foundIn(output: string): Read | null {
  for (const line of output.split("\n")) {
    const held = objectIn(line)
    if (held === null) continue
    const said = held[DIAGNOSTICS]
    if (!Array.isArray(said)) continue
    const found: Found[] = []
    for (const one of said) {
      const each = foundOf(one)
      if (each !== null) found.push(each)
    }
    return { errors: countIn(held[SUMMARY], ERRORS), found }
  }
  return null
}

export function endOf(output: string): string {
  const held = output.split("\n").filter((one) => one.trim() !== "")
  const said = (held[held.length - 1] ?? "").trim()
  return said.length <= SAID_AT_MOST ? said : `${said.slice(0, SAID_AT_MOST)}...`
}

type Done = {
  readonly code: number
  readonly output: string
}

function unlooked(why: string): Linted {
  return { code: UNRUN, errors: 0, found: [], failed: why }
}

function askedOf(at: string, root: string, named: readonly string[]): Done {
  const done = ran([at, CHECKS, REPORTER, CEILING, ...named], { cwd: root })
  return { code: done.code, output: `${done.out}${done.err}` }
}

export function batchedIn(named: readonly string[]): readonly (readonly string[])[] {
  const found: string[][] = []
  let held: string[] = []
  let width = 0
  for (const one of named) {
    if (held.length > 0 && width + one.length + 1 > NAMED_AT_MOST) {
      found.push(held)
      held = []
      width = 0
    }
    held.push(one)
    width += one.length + 1
  }
  found.push(held)
  return found
}

export function lintedOver(root: string, named: readonly string[], under: string = root): Linted {
  const at = join(under, BINARY)
  if (!existsSync(at)) {
    return unlooked(`no linter is at \`${BINARY}\` under ${under}, so nothing was looked at`)
  }
  let code = 0
  let errors = 0
  const found: Found[] = []
  for (const batch of batchedIn(named)) {
    let done: Done
    try {
      done = askedOf(at, root, batch)
    } catch (thrown) {
      const why = thrown instanceof Error ? thrown.message : String(thrown)
      return unlooked(`the linter at \`${BINARY}\` could not be run — ${why}`)
    }
    const said = foundIn(done.output)
    if (said === null) {
      return {
        code: done.code,
        errors: 0,
        found: [],
        failed:
          `the linter exited ${done.code} and printed nothing that reads as a run — ` +
          `${endOf(done.output)}`,
      }
    }
    if (code === 0) code = done.code
    errors += said.errors
    found.push(...said.found)
  }
  return { code, errors, found, failed: null }
}
