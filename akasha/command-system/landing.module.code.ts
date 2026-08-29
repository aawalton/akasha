import { execFileSync } from "node:child_process"
import {
  closeSync,
  mkdirSync,
  openSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
  writeSync,
} from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import type { Judging, Leaving } from "../checks-system/judging.module.code.ts"

export type Change = {
  readonly path: string
  readonly body: Uint8Array | null
}

export type Proposed = {
  readonly base: string
  readonly changed: readonly Change[]
}

export type Landed = {
  readonly base: string
  readonly commit: string | null
  readonly wrote: readonly string[]
  readonly took: readonly string[]
}

export type Refused = {
  readonly refusals: readonly string[]
}

const LOCK_AT = ".git/akasha-landing.lock"

const HELD_FOR = 120000

const WAITED = 50

const CHECKING = "../checks-system/checking.module.code.ts"

export const CHECKING_AT = "akasha/checks-system/checking.module.code.ts"

const PATCH = "patch"

const SAID_AT_MOST = 240

const reach_ = createRequire(import.meta.url)

export const NO_GATE: Judging = { named: [], over: () => [] }

export type Built = { readonly gate: Judging } | { readonly broken: string }

type Checking = {
  readonly checksIn: (root: string) => readonly unknown[]
  readonly checksAt: (every: readonly unknown[], phase: string) => readonly unknown[]
  readonly judgingBy: (every: readonly unknown[]) => Judging
}

export function oneLine(said: string): string {
  const held = said.replace(/\s+/g, " ").trim()
  return held.length <= SAID_AT_MOST ? held : `${held.slice(0, SAID_AT_MOST - 3)}...`
}

function checkingLoaded(): Checking {
  const held = reach_(CHECKING) as Partial<Checking>
  const named = [held.checksIn, held.checksAt, held.judgingBy]
  if (named.some((one) => typeof one !== "function")) {
    throw new Error("it answers to no `checksIn`, `checksAt` and `judgingBy` a gate is built from")
  }
  return held as Checking
}

export function gateBuilt(root: string): Built {
  try {
    const held = checkingLoaded()
    return { gate: held.judgingBy(held.checksAt(held.checksIn(root), PATCH)) }
  } catch (thrown) {
    return { broken: oneLine(thrown instanceof Error ? thrown.message : String(thrown)) }
  }
}

function gitIn(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
}

export function baseOf(root: string): string {
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

export function bodyAt(root: string, base: string, path: string): Uint8Array | null {
  try {
    return execFileSync("git", ["-C", root, "cat-file", "blob", `${base}:${path}`], {
      maxBuffer: 64 * 1024 * 1024,
    })
  } catch {
    return null
  }
}

export function leavingOf(root: string, proposed: Proposed): Leaving {
  const held = new Map<string, Uint8Array | null>()
  for (const one of proposed.changed) held.set(one.path, one.body)
  return {
    root,
    changed: proposed.changed.map((one) => one.path).sort(),
    at: (path) => {
      const said = held.get(path)
      if (said !== undefined) return said
      if (held.has(path)) return null
      return bodyAt(root, proposed.base, path)
    },
  }
}

function heldBy(at: string): number | null {
  try {
    const first = readFileSync(at, "utf8").trim().split(" ")[0]
    if (first === undefined) return null
    const pid = Number.parseInt(first, 10)
    return Number.isNaN(pid) ? null : pid
  } catch {
    return null
  }
}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function taken(at: string): boolean {
  try {
    const held = openSync(at, "wx")
    writeSync(held, `${process.pid} ${Date.now()}`)
    closeSync(held)
    return true
  } catch {
    return false
  }
}

export function holding<T>(root: string, act: () => T, waited: number = HELD_FOR): T {
  const at = join(root, LOCK_AT)
  mkdirSync(dirname(at), { recursive: true })
  const until = Date.now() + waited
  while (!taken(at)) {
    const pid = heldBy(at)
    if (pid !== null && !alive(pid)) {
      rmSync(at, { force: true })
      continue
    }
    if (Date.now() > until) {
      throw new Error(
        `another landing has held \`${LOCK_AT}\` for longer than ${Math.round(waited / 1000)}s, so this change was not judged and nothing was written`
      )
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, WAITED)
  }
  try {
    return act()
  } finally {
    try {
      unlinkSync(at)
    } catch {}
  }
}

function wroteOnto(root: string, changed: readonly Change[]): {
  readonly wrote: readonly string[]
  readonly took: readonly string[]
} {
  const wrote: string[] = []
  const took: string[] = []
  for (const one of changed) {
    const at = join(root, one.path)
    if (one.body === null) {
      rmSync(at, { force: true })
      took.push(one.path)
      continue
    }
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, one.body)
    wrote.push(one.path)
  }
  return { wrote, took }
}

function committed(
  root: string,
  paths: readonly string[],
  message: string,
  writer: string | null
): string | null {
  for (const one of paths) {
    try {
      gitIn(root, ["add", "--intent-to-add", "--", one])
    } catch {}
  }
  try {
    gitIn(root, ["diff", "--quiet", "HEAD", "--", ...paths])
    return null
  } catch {}
  const named = writer === null ? [] : [`--author=${writer}`]
  gitIn(root, ["commit", ...named, "-m", message, "--", ...paths])
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

export function landing(
  root: string,
  changes: readonly Change[],
  message: string,
  judging: Judging,
  writer: string | null = null
): Landed | Refused {
  if (changes.length === 0) {
    return { refusals: ["nothing was asked for, so nothing was judged and nothing was written"] }
  }
  return holding(root, () => {
    const base = baseOf(root)
    const proposed = { base, changed: changes }
    const said = judging.over(leavingOf(root, proposed))
    if (said.length > 0) {
      return {
        refusals: [
          ...said.map((one) => `${one.path} — ${one.reason}`),
          `nothing was written — ${changes.length} change(s) were asked for and they land together or not at all`,
        ],
      }
    }
    const put = wroteOnto(root, changes)
    const commit = committed(root, [...put.wrote, ...put.took].sort(), message, writer)
    return { base, commit, wrote: put.wrote, took: put.took }
  })
}
