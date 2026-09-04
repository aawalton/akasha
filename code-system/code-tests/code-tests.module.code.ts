import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, isAbsolute, join, relative, sep } from "node:path"
import { indexNamed } from "@akasha/indexes"
import { filedInto } from "@akasha/indexes/indexing"
import type { Filing } from "@akasha/indexes/shape"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { ran } from "@akasha/utils-run/running"

const TS = ".ts"

const TEST = "test"

const CODE = "code"

const HELD: readonly string[] = ["ts", "tsx"]

const SUFFIXES: readonly string[] = HELD.map((one) => `.${TEST}.${one}`)

const CODINGS: readonly string[] = HELD.map((one) => `.${CODE}.${one}`)

const RUNNER = "bun"

const RUNS = "test"

const ESCAPE = String.fromCharCode(27)

const MARK = "1"

const HOLD = "/var/tmp"

const PREFIX = "akasha-world-"

const INDEX = indexNamed()

const MODULES = "node_modules"

const SCOPE = "@"

const OUT = ".."

const MANIFEST = "package.json"

const CONFIG = "bunfig.toml"

const PRELOADING = "--preload"

export const RUNNING = "AKASHA_TESTS_RUNNING"

export const CARRIED: readonly string[] = [
  ".gitignore",
  ".sops.yaml",
  "biome.json",
  MANIFEST,
  "tsconfig.json",
  "tsconfig.base.json",
]

export type Verdict = "pass" | "fail" | "short" | "crash"

export type Summary = {
  readonly files: number | null
  readonly failed: number | null
  readonly passed: number | null
}

export type Ran = {
  readonly code: number
  readonly output: string
  readonly summary: Summary
  readonly verdict: Verdict
}

export type World = {
  readonly root: string
  readonly sweep: () => undefined
}

export type Grouping = {
  readonly preloads: readonly string[]
  readonly named: string[]
}

export function alreadyRunning(): boolean {
  return process.env[RUNNING] === MARK
}

export function testNamed(path: string): boolean {
  return SUFFIXES.some((one) => path.endsWith(one))
}

export function testsIn(absolute: string): readonly string[] {
  if (!existsSync(absolute)) return []
  if (statSync(absolute).isFile()) return testNamed(absolute) ? [absolute] : []
  const held: string[] = []
  for (const one of readdirSync(absolute, { withFileTypes: true })) {
    const at = join(absolute, one.name)
    if (one.isDirectory()) held.push(...testsIn(at))
    else if (one.isFile() && testNamed(one.name)) held.push(at)
  }
  return held
}

export function testsUnder(absolute: string): number {
  return testsIn(absolute).length
}

export function testsBesideOf(path: string): readonly string[] {
  if (testNamed(path)) return [path]
  const coding = CODINGS.find((one) => path.endsWith(one))
  const page = coding === undefined ? path : `${path.slice(0, -coding.length)}${TS}`
  const found: string[] = []
  for (const one of HELD) {
    const beside = besideAt(page, TEST, one)
    if (beside !== null) found.push(beside)
  }
  return found
}

export function plain(output: string): string {
  return output.replace(new RegExp(`${ESCAPE}\\[[0-9;]*m`, "g"), "")
}

function totalOf(clean: string, shape: RegExp): number | null {
  let held: number | null = null
  for (const found of clean.matchAll(shape)) {
    const one = Number.parseInt(found[1] ?? "", 10)
    if (Number.isFinite(one)) held = (held ?? 0) + one
  }
  return held
}

export function summaryIn(output: string): Summary {
  const clean = plain(output)
  return {
    files: totalOf(clean, /\bRan\s+\d+\s+tests?\s+across\s+(\d+)\s+files?/g),
    failed: totalOf(clean, /^\s*(\d+)\s+fail\b/gm),
    passed: totalOf(clean, /^\s*(\d+)\s+pass\b/gm),
  }
}

export function verdictOf(code: number, output: string, expected: number): Verdict {
  const said = summaryIn(output)
  if (said.files === null) return "crash"
  if (expected > 0 && said.files < expected) return "short"
  if (said.failed !== null && said.failed > 0) return "fail"
  if (code === 0) return "pass"
  return said.failed === 0 ? "pass" : "fail"
}

function withinOf(real: string, at: string): string | null {
  const inside = relative(real, realpathSync(at))
  if (inside.startsWith(OUT) || isAbsolute(inside)) return null
  return inside.split(sep)[0] === MODULES ? null : inside
}

function linkedInto(
  real: string,
  root: string,
  live: string,
  into: string,
  one: string
): undefined {
  const at = join(live, one)
  if (!existsSync(at)) return
  const inside = withinOf(real, at)
  if (inside === null) {
    symlinkSync(at, join(into, one))
    return
  }
  const held = join(root, inside)
  if (existsSync(join(held, MANIFEST))) symlinkSync(held, join(into, one))
}

function modulesInto(from: string, root: string): undefined {
  const live = join(from, MODULES)
  if (!existsSync(live)) return
  const real = realpathSync(from)
  const into = join(root, MODULES)
  mkdirSync(into, { recursive: true })
  for (const one of readdirSync(live)) {
    if (!one.startsWith(SCOPE)) {
      linkedInto(real, root, live, into, one)
      continue
    }
    const scope = join(live, one)
    if (!existsSync(scope)) continue
    const under = join(into, one)
    mkdirSync(under, { recursive: true })
    for (const member of readdirSync(scope)) linkedInto(real, root, scope, under, member)
  }
}

export function saidOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function reaching<Held>(root: string, named: string, act: () => Held): Held {
  try {
    return act()
  } catch (thrown) {
    throw new Error(`the world at ${root} could not be made: ${named} — ${saidOf(thrown)}`)
  }
}

const ROOT_NAME = "akasha"

function heldMade(): string {
  try {
    return mkdtempSync(join(HOLD, PREFIX))
  } catch (thrown) {
    throw new Error(`no world could be made under ${HOLD} — ${saidOf(thrown)}`)
  }
}

function rootMade(held: string): string {
  const root = join(held, ROOT_NAME)
  try {
    mkdirSync(root, { recursive: true })
    return root
  } catch (thrown) {
    throw new Error(`no world could be made under ${held} — ${saidOf(thrown)}`)
  }
}

export function worldOf(
  from: string,
  paths: readonly string[],
  at: (path: string) => Uint8Array | null,
  filed: readonly Filing[] | null
): World {
  const held = heldMade()
  const root = rootMade(held)
  try {
    for (const one of paths) {
      const bytes = reaching(root, `the body handed in for \`${one}\` would not be read`, () =>
        at(one)
      )
      if (bytes === null) continue
      const to = join(root, one)
      reaching(root, `\`${one}\` would not be written`, () => {
        mkdirSync(dirname(to), { recursive: true })
        writeFileSync(to, bytes)
      })
    }
    const index = join(from, INDEX)
    if (filed !== null && existsSync(index)) {
      reaching(root, `the index at ${index} would not be taken`, () => {
        const to = join(root, INDEX)
        mkdirSync(dirname(to), { recursive: true })
        cpSync(index, to, { recursive: true })
        filedInto(to, filed)
      })
    }
    for (const one of CARRIED) {
      const held = join(from, one)
      if (existsSync(held)) {
        reaching(root, `${held} would not be taken`, () => cpSync(held, join(root, one)))
      }
    }
    reaching(root, `the modules under ${from} would not be linked`, () => modulesInto(from, root))
  } catch (thrown) {
    rmSync(held, { recursive: true, force: true })
    throw thrown
  }
  return {
    root,
    sweep: (): undefined => {
      rmSync(held, { recursive: true, force: true })
    },
  }
}

type Configured = { readonly test?: { readonly preload?: unknown } }

function everyIn(held: unknown): readonly unknown[] {
  if (typeof held === "string") return [held]
  return Array.isArray(held) ? held : []
}

export function preloadsIn(at: string): readonly string[] {
  const read = Bun.TOML.parse(readFileSync(at, "utf8")) as Configured
  const found: string[] = []
  for (const one of everyIn(read.test?.preload)) {
    if (typeof one !== "string") continue
    found.push(one.startsWith(".") ? join(dirname(at), one) : one)
  }
  return found
}

function configAbove(root: string, from: string): string | null {
  let held = from
  while (held.startsWith(root)) {
    const found = join(held, CONFIG)
    if (existsSync(found)) return found
    held = dirname(held)
  }
  return null
}

function preloadingFor(root: string, at: string): readonly string[] {
  const found = configAbove(root, dirname(at))
  if (found === null || found === join(root, CONFIG)) return []
  return preloadsIn(found)
}

export function groupedBy(root: string, named: readonly string[]): readonly Grouping[] {
  const held = new Map<string, Grouping>()
  const seen = new Set<string>()
  for (const one of named) {
    for (const at of testsIn(join(root, one))) {
      if (seen.has(at)) continue
      seen.add(at)
      const preloads = preloadingFor(root, at)
      const key = JSON.stringify(preloads)
      const group = held.get(key)
      if (group === undefined) held.set(key, { preloads, named: [relative(root, at)] })
      else group.named.push(relative(root, at))
    }
  }
  const groups = [...held.values()]
  for (const group of groups) group.named.sort()
  groups.sort((one, two) => ((one.named[0] ?? "") < (two.named[0] ?? "") ? -1 : 1))
  return groups
}

export function ranOver(root: string, named: readonly string[], expected: number): Ran {
  const grouped = groupedBy(root, named)
  const runs = grouped.length === 0 ? [{ preloads: [], named: [...named] }] : grouped
  let code = 0
  let output = ""
  for (const group of runs) {
    const preloading = group.preloads.flatMap((one) => [PRELOADING, one])
    const done = ran([RUNNER, RUNS, ...preloading, ...group.named], {
      cwd: root,
      env: { ...process.env, [RUNNING]: MARK },
    })
    output += `${done.out}${done.err}`
    if (code === 0) code = done.code
  }
  return {
    code,
    output,
    summary: summaryIn(output),
    verdict: verdictOf(code, output, expected),
  }
}
