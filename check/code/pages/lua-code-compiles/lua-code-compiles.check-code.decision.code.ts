import { existsSync, mkdirSync, readdirSync, symlinkSync, writeFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import {
  type Addon,
  addonsIn,
  BASE,
  programOf,
  reachedAmong,
  settingsOf,
  type Tree,
} from "akasha/check/code/pages/lua-code-compiles/modules/addon-programs/addon-programs.module.code.ts"
import { reachedBy } from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import {
  type Mirror,
  mirroredOf,
} from "akasha/check/modules/change-mirror/change-mirror.module.code.ts"
import {
  holdingOver,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
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
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  compilerCommand,
  compilerRoot,
} from "akasha/temper/addon/build/modules/lua-build-command/lua-build-command.module.code.ts"
import { z } from "zod"

const COMPILER = "typescript/lib/tsc.js"

const ARGV: readonly string[] = ["--noEmit", "--pretty", "false", "--project"]

const NO_LUA: readonly string[] = ["--noEmitLua", "true", "--pretty", "false"]

const JUDGED: ReadonlySet<number> = new Set([0, 1, 2])

const WAITED_AT_MOST = 300_000

const PACKAGES = "node_modules"

const PACKAGE = "akasha"

const SETTINGS_HELD = ".lua-code-compiles"

const SETTINGS_ENDING = ".tsconfig.json"

const MANIFESTS: readonly string[] = ["/addon.json", ".addon-manifest.json"]

const PLACED = /^(.+)\((\d+),(\d+)\): error TS(\w+): (.*)$/

const UNPLACED = /^error TS(\w+): (.*)$/

const COUNTED = z.coerce.number().int()

const PLACED_SAID = z.tuple([z.string(), z.string(), COUNTED, COUNTED, z.string(), z.string()])

const UNPLACED_SAID = z.tuple([z.string(), z.string(), z.string()])

const FOLLOWS = " "

const MIRROR = "the mirror this change was written into"

const UNLOOKED = "A compiler that could not finish has verified nothing, so nothing was judged."

const SAID_AT_MOST = 240

type Bytes = (path: string) => Uint8Array | null

export type Found = {
  readonly path: string | null
  readonly line: number
  readonly column: number
  readonly code: string
  readonly said: string
}

type Compiled = {
  readonly found: readonly Found[]
  readonly failed: string | null
}

type Held = {
  readonly path: string
  readonly reason: string
  readonly under: string[]
}

type Entered = {
  readonly addon: Addon
  readonly entry: string
}

export function builtFrom(path: string): boolean {
  return (
    textNamed(path) ||
    CONFIGS.includes(basename(path)) ||
    path === BASE ||
    MANIFESTS.some((one) => path.endsWith(one))
  )
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

function compiledBy(root: string, argv: readonly string[]): Compiled {
  const done = ran(argv, { cwd: root, timeout: WAITED_AT_MOST })
  const why = `${done.out}${done.err}`.trim().slice(0, SAID_AT_MOST)
  if (!JUDGED.has(done.code))
    return { found: [], failed: `the compiler exited ${done.code} — ${why}` }
  const found = foundIn(done.out)
  if (done.code !== 0 && found.length === 0) {
    return { found: [], failed: `the compiler exited ${done.code} and named no error — ${why}` }
  }
  return { found, failed: null }
}

function compiledOver(root: string, config: string): Compiled {
  const at = compilerAt()
  if (at === null) return { found: [], failed: `no compiler resolves as \`${COMPILER}\`` }
  return compiledBy(root, [process.execPath, at, ...ARGV, config])
}

function outsideOf(said: string, root: string): string {
  return said.replaceAll(`${root}/`, "").replaceAll(root, MIRROR)
}

function reasonOf(one: Found): string {
  return `TS${one.code} at line ${one.line}, column ${one.column} — ${one.said}`
}

function packagesLinked(root: string): undefined {
  const into = join(root, PACKAGES)
  mkdirSync(into, { recursive: true })
  symlinkSync(root, join(into, PACKAGE))
  const from = join(codeRoot(), PACKAGES)
  if (!existsSync(from)) return
  for (const name of readdirSync(from)) {
    if (name !== PACKAGE) symlinkSync(join(from, name), join(into, name))
  }
}

function mirroredWith(paths: readonly string[], bytes: Bytes): Mirror {
  const mirror = mirroredOf(paths, bytes)
  try {
    packagesLinked(mirror.root)
  } catch (thrown) {
    mirror.sweep()
    throw thrown
  }
  return mirror
}

function mirroring(library: Library, listed: readonly string[], bytes: Bytes): Mirror {
  const named = [
    ...library.configs.map((one) => one.at),
    ...listed.filter((one) => claims(library, one)),
  ]
  return mirroredWith(named, bytes)
}

function heldInto(
  said: Map<string, Held>,
  under: string,
  unplaced: string,
  compiled: Compiled,
  root: string
): undefined {
  for (const one of compiled.found) {
    const path = one.path === null ? unplaced : outsideOf(one.path, root)
    const reason = outsideOf(reasonOf(one), root)
    const key = `${path}\n${reason}`
    const held = said.get(key)
    if (held === undefined) said.set(key, { path, reason, under: [under] })
    else held.under.push(under)
  }
}

function heldOf(said: ReadonlyMap<string, Held>): readonly Judged[] {
  return [...said.values()].map((one) => ({
    path: one.path,
    reason: `${one.reason} — under ${one.under.join(" and ")}`,
  }))
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
      if (compiled.failed === null) heldInto(said, config.at, config.at, compiled, mirror.root)
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
  return [...heldOf(said), ...failed]
}

function unentered(one: Addon): Judged {
  const why =
    one.entry === null ? "no module page carries that slug" : `\`${one.entry}\` is not there`
  return {
    path: one.page,
    reason: `this names \`${one.entrySlug ?? ""}\` as its bundle entry, and ${why}, so nothing of it was compiled`,
  }
}

function compiledAs(root: string, one: Entered): Compiled {
  const config = join(root, SETTINGS_HELD, `${one.addon.name}${SETTINGS_ENDING}`)
  mkdirSync(dirname(config), { recursive: true })
  writeFileSync(config, settingsOf(root, one.addon, one.entry))
  return compiledBy(root, compilerCommand(compilerRoot(), config, NO_LUA))
}

export function addonsJudged(
  addons: readonly Addon[],
  tree: Tree,
  bytes: Bytes
): readonly Judged[] {
  const failed: Judged[] = []
  const entered: Entered[] = []
  for (const one of addons) {
    if (one.entrySlug === null) continue
    if (one.entry !== null && tree.read(one.entry) !== null) {
      entered.push({ addon: one, entry: one.entry })
    } else failed.push(unentered(one))
  }
  if (entered.length === 0) return failed
  const paths = new Set([BASE])
  for (const one of entered) for (const at of programOf(one.addon, tree)) paths.add(at)
  const said = new Map<string, Held>()
  const mirror = mirroredWith([...paths], bytes)
  try {
    for (const one of entered) {
      const compiled = compiledAs(mirror.root, one)
      const { name, page } = one.addon
      if (compiled.failed === null) heldInto(said, name, page, compiled, mirror.root)
      else {
        const reason = `${outsideOf(compiled.failed, mirror.root)}. ${UNLOOKED}`
        failed.push({ path: page, reason, threw: true })
      }
    }
  } finally {
    mirror.sweep()
  }
  return [...heldOf(said), ...failed]
}

export function reachedOver(
  libraries: readonly Library[],
  paths: readonly string[]
): readonly Library[] {
  const reaches = (library: Library, at: string): boolean =>
    at === library.page || library.configs.some((one) => one.at === at) || claims(library, at)
  return libraries.filter((one) => paths.some((at) => reaches(one, at)))
}

function addonsReached(change: Change, shadow: Shadow, tree: Tree): readonly Addon[] {
  const every = addonsIn(tree)
  if (every.length === 0) return []
  return reachedAmong(every, [...change.changed, ...reachedBy(change, shadow)])
}

export function refusalsOver(given: Change, shadow: Shadow): readonly Judged[] {
  const change = holdingOver(given)
  const read = (path: string): string | null => textOf(change.after(path))
  const tree: Tree = { index: shadow.index, listed: () => shadow.listed(), read }
  const reached = reachedOver(librariesIn(change.changed, read, shadow.index), change.changed)
  const libraries = reached.length === 0 ? [] : judgedAcross(reached, tree.listed(), change.after)
  const addons = addonsReached(change, shadow, tree)
  return [...libraries, ...addonsJudged(addons, tree, change.after)]
}
