import { mkdirSync, symlinkSync } from "node:fs"
import { basename, join } from "node:path"
import {
  type Mirror,
  mirroredOf,
} from "akasha/check/modules/change-mirror/change-mirror.module.code.ts"
import { textNamed } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import {
  CONFIGS,
  claims,
  type Library,
  librariesIn,
} from "akasha/code/lua-runtime-library/modules/config-claiming/config-claiming.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { z } from "zod"

const COMPILER = "typescript/lib/tsc.js"

const ARGV: readonly string[] = ["--noEmit", "--pretty", "false", "--project"]

const JUDGED: ReadonlySet<number> = new Set([0, 1, 2])

const WAITED_AT_MOST = 300_000

const PACKAGES = "node_modules"

const PACKAGE = "akasha"

const PLACED = /^(.+)\((\d+),(\d+)\): error TS(\d+): (.*)$/

const UNPLACED = /^error TS(\d+): (.*)$/

const COUNTED = z.coerce.number().int()

const PLACED_SAID = z.tuple([z.string(), z.string(), COUNTED, COUNTED, COUNTED, z.string()])

const UNPLACED_SAID = z.tuple([z.string(), COUNTED, z.string()])

const FOLLOWS = " "

const MIRROR = "the mirror this change was written into"

const UNLOOKED = "A compiler that could not finish has verified nothing, so nothing was judged."

const SAID_AT_MOST = 240

type Bytes = (path: string) => Uint8Array | null

export type Found = {
  readonly path: string | null
  readonly line: number
  readonly column: number
  readonly code: number
  readonly said: string
}

export type Compiled = {
  readonly found: readonly Found[]
  readonly failed: string | null
}

type Held = {
  readonly path: string
  readonly reason: string
  readonly configs: string[]
}

export function builtFrom(path: string): boolean {
  return textNamed(path) || CONFIGS.includes(basename(path))
}

function lineOf(line: string): Found | null {
  const placed = PLACED_SAID.safeParse(PLACED.exec(line))
  if (placed.success) {
    const [, path, at, column, code, said] = placed.data
    return { path, line: at, column, code, said }
  }
  const unplaced = UNPLACED_SAID.safeParse(UNPLACED.exec(line))
  if (!unplaced.success) return null
  const [, code, said] = unplaced.data
  return { path: null, line: 0, column: 0, code, said }
}

export function foundIn(output: string): readonly Found[] {
  const found: Found[] = []
  for (const line of output.split("\n")) {
    const one = lineOf(line)
    if (one !== null) {
      found.push(one)
      continue
    }
    const last = found.pop()
    if (last === undefined) continue
    const more = line.startsWith(FOLLOWS) ? ` ${line.trim()}` : ""
    found.push({ ...last, said: `${last.said}${more}` })
  }
  return found
}

function compilerAt(): string | null {
  try {
    return Bun.resolveSync(COMPILER, import.meta.dir)
  } catch {
    return null
  }
}

export function compiledOver(root: string, config: string): Compiled {
  const at = compilerAt()
  if (at === null) return { found: [], failed: `no compiler resolves as \`${COMPILER}\`` }
  const done = ran([process.execPath, at, ...ARGV, config], { cwd: root, timeout: WAITED_AT_MOST })
  const why = `${done.out}${done.err}`.trim().slice(0, SAID_AT_MOST)
  if (!JUDGED.has(done.code))
    return { found: [], failed: `the compiler exited ${done.code} — ${why}` }
  const found = foundIn(done.out)
  if (done.code !== 0 && found.length === 0) {
    return { found: [], failed: `the compiler exited ${done.code} and named no error — ${why}` }
  }
  return { found, failed: null }
}

function outsideOf(said: string, root: string): string {
  return said.replaceAll(`${root}/`, "").replaceAll(root, MIRROR)
}

export function reasonOf(one: Found): string {
  return `TS${one.code} at line ${one.line}, column ${one.column} — ${one.said}`
}

function mirroring(library: Library, listed: readonly string[], bytes: Bytes): Mirror {
  const named = [
    ...library.configs.map((one) => one.at),
    ...listed.filter((one) => claims(library, one)),
  ]
  const mirror = mirroredOf(named, bytes)
  try {
    mkdirSync(join(mirror.root, PACKAGES), { recursive: true })
    symlinkSync(mirror.root, join(mirror.root, PACKAGES, PACKAGE))
  } catch (thrown) {
    mirror.sweep()
    throw thrown
  }
  return mirror
}

function heldInto(
  said: Map<string, Held>,
  config: string,
  compiled: Compiled,
  root: string
): undefined {
  for (const one of compiled.found) {
    const path = one.path === null ? config : outsideOf(one.path, root)
    const reason = outsideOf(reasonOf(one), root)
    const key = `${path}\n${reason}`
    const held = said.get(key)
    if (held === undefined) said.set(key, { path, reason, configs: [config] })
    else held.configs.push(config)
  }
}

function judgedIn(
  library: Library,
  listed: readonly string[],
  bytes: Bytes,
  said: Map<string, Held>
): readonly Judged[] {
  const failed: Judged[] = []
  const mirror = mirroring(library, listed, bytes)
  try {
    for (const config of library.configs) {
      const compiled = compiledOver(mirror.root, join(mirror.root, config.at))
      if (compiled.failed === null) heldInto(said, config.at, compiled, mirror.root)
      else {
        const reason = `${outsideOf(compiled.failed, mirror.root)}. ${UNLOOKED}`
        failed.push({ path: config.at, reason, threw: true })
      }
    }
  } finally {
    mirror.sweep()
  }
  return failed
}

export function judgedAcross(
  libraries: readonly Library[],
  listed: readonly string[],
  bytes: Bytes
): readonly Judged[] {
  const said = new Map<string, Held>()
  const failed: Judged[] = []
  for (const library of libraries) {
    if (library.configs.length === 0) continue
    failed.push(...judgedIn(library, listed, bytes, said))
  }
  const found = [...said.values()].map((one) => ({
    path: one.path,
    reason: `${one.reason} — under ${one.configs.join(" and ")}`,
  }))
  return [...found, ...failed]
}

export function reachedOver(
  libraries: readonly Library[],
  paths: readonly string[]
): readonly Library[] {
  const reaches = (library: Library, at: string): boolean =>
    at === library.page || library.configs.some((one) => one.at === at) || claims(library, at)
  return libraries.filter((one) => paths.some((at) => reaches(one, at)))
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const read = (path: string): string | null => textOf(change.after(path))
  const reached = reachedOver(librariesIn(change.changed, read, shadow.index), change.changed)
  if (reached.length === 0) return []
  return judgedAcross(reached, shadow.listed(), change.after)
}
