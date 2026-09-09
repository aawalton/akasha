import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { besideAt } from "@akasha/pages/page-file-name"
import type { Said } from "@akasha/utils/run/running"
import { ran } from "@akasha/utils/run/running"
import { test as testFile } from "../modules/properties/test.code-file-property.ts"
import { type Bodies, mountedOver, type Overlay } from "../test-overlay/test-overlay.module.code.ts"

const TS = ".ts"

const TEST = "test"

const CODE = "code"

const HELD: readonly string[] = ["ts", "tsx"]

const SUFFIXES: readonly string[] = HELD.map((one) => `.${TEST}.${one}`)

const FIXTURES = `${TEST}-fixtures`

const BESIDES: readonly string[] = [CODE, FIXTURES].flatMap((slug) =>
  HELD.map((one) => `.${slug}.${one}`)
)

const RUNNER = "bun"

const RUNS = "test"

const ESCAPE = String.fromCharCode(27)

const MARK = "1"

const MODULES = "node_modules"

const GIT_DIR = ".git"

const SKIPPED: readonly string[] = [MODULES, GIT_DIR]

const CONFIG = "bunfig.toml"

const PRELOADING = "--preload"

const NAMING = "--test-name-pattern"

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const NONE_NAMED = /\bmatched 0 tests\b/

export const RUNNING = "AKASHA_TESTS_RUNNING"

export const MEASURING = "AKASHA_TESTS_MEASURING"

export const BATCH = 100

export const CEILING = testFile.maxCpuSeconds

export type Verdict = "pass" | "fail" | "short" | "crash" | "slow"

export type Slowed = {
  readonly path: string
  readonly cpuSeconds: number
}

export type Spent = {
  readonly path: string
  readonly cpuSeconds: number
  readonly signal: string | null
  readonly code: number
}

export type Summary = {
  readonly files: number | null
  readonly failed: number | null
  readonly passed: number | null
}

export type Ran = {
  readonly code: number
  readonly signal: string | null
  readonly output: string
  readonly summary: Summary
  readonly verdict: Verdict
  readonly cpuSeconds: number
  readonly slow: readonly Slowed[]
}

export type Grouping = {
  readonly preloads: readonly string[]
  readonly named: string[]
}

export function alreadyRunning(): boolean {
  return process.env[RUNNING] === MARK
}

export function measuring(): boolean {
  return process.env[MEASURING] === MARK
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
    if (one.isDirectory()) {
      if (!SKIPPED.includes(one.name)) held.push(...testsIn(at))
    } else if (one.isFile() && testNamed(one.name)) held.push(at)
  }
  return held
}

export function testsUnder(absolute: string): number {
  return testsIn(absolute).length
}

export function testsBesideOf(path: string): readonly string[] {
  if (testNamed(path)) return [path]
  const part = BESIDES.find((one) => path.endsWith(one))
  const page = part === undefined ? path : `${path.slice(0, -part.length)}${TS}`
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
  const files = totalOf(clean, /\bRan\s+\d+\s+tests?\s+across\s+(\d+)\s+files?/g)
  if (files === null && NONE_NAMED.test(clean)) return { files: 0, failed: 0, passed: 0 }
  return {
    files,
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

function namedUnder(root: string, one: string): readonly string[] {
  const absolute = join(root, one)
  if (existsSync(absolute)) return testsIn(absolute)
  return testNamed(one) ? [absolute] : []
}

export function groupedBy(root: string, named: readonly string[]): readonly Grouping[] {
  const held = new Map<string, Grouping>()
  const seen = new Set<string>()
  for (const one of named) {
    for (const at of namedUnder(root, one)) {
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

function wholeOf(name: string): string {
  return `^${name.replace(SPECIAL, "\\$&")}$`
}

export function batchedOf(named: readonly string[]): readonly (readonly string[])[] {
  if (named.length <= BATCH) return [named]
  const held: (readonly string[])[] = []
  for (let at = 0; at < named.length; at += BATCH) held.push(named.slice(at, at + BATCH))
  return held
}

function runsIn(
  root: string,
  argv: readonly string[],
  ceiling: number | null,
  over: Overlay | null
): Said {
  const env = over === null ? process.env : { ...process.env, ...over.env }
  const held = { cwd: root, env: { ...env, [RUNNING]: MARK } }
  const called = over === null ? [...argv] : [...over.under(argv)]
  return ran(called, ceiling === null ? held : { ...held, cpuCeiling: ceiling })
}

function runsFor(root: string, named: readonly string[]): readonly Grouping[] {
  const grouped = groupedBy(root, named)
  return grouped.length === 0 ? [{ preloads: [], named: [...named] }] : grouped
}

export function spentIn(
  root: string,
  runs: readonly Grouping[],
  naming: readonly string[],
  ceiling: number | null = CEILING,
  over: Overlay | null = null
): readonly Spent[] {
  const found: Spent[] = []
  for (const group of runs) {
    const preloading = group.preloads.flatMap((one) => [PRELOADING, one])
    for (const one of group.named) {
      const argv = [RUNNER, RUNS, ...preloading, ...naming, one]
      const done = runsIn(root, argv, ceiling, over)
      found.push({
        path: one,
        cpuSeconds: done.cpuSeconds,
        signal: done.signal,
        code: done.code,
      })
    }
  }
  return found
}

export function slowIn(
  root: string,
  runs: readonly Grouping[],
  naming: readonly string[],
  ceiling: number = CEILING,
  over: Overlay | null = null
): readonly Slowed[] {
  return spentIn(root, runs, naming, ceiling, over)
    .filter((one) => one.signal !== null || one.cpuSeconds > ceiling)
    .map((one) => ({ path: one.path, cpuSeconds: one.cpuSeconds }))
}

export function endedAt(signal: string | null, spent: number, ceiling: number): boolean {
  return signal !== null && spent > ceiling
}

export function judgedAs(said: Verdict, over: number, ended: boolean): Verdict {
  return over > 0 || ended ? "slow" : said
}

export function spentOver(
  root: string,
  named: readonly string[],
  bodies: Bodies | null = null
): readonly Spent[] {
  const over = bodies === null ? null : mountedOver(root, bodies)
  try {
    return spentIn(root, runsFor(root, named), [], null, over)
  } finally {
    over?.sweep()
  }
}

function ranUnder(
  root: string,
  named: readonly string[],
  expected: number,
  name: string | null,
  over: Overlay | null
): Ran {
  const runs = runsFor(root, named)
  const naming = name === null ? [] : [NAMING, wholeOf(name)]
  let code = 0
  let signal: string | null = null
  let output = ""
  let spent = 0
  let many = 0
  let ended = false
  for (const group of runs) {
    const preloading = group.preloads.flatMap((one) => [PRELOADING, one])
    for (const batch of batchedOf(group.named)) {
      const argv = [RUNNER, RUNS, ...preloading, ...naming, ...batch]
      const bound = CEILING * batch.length
      const done = runsIn(root, argv, bound, over)
      output += `${done.out}${done.err}`
      spent += done.cpuSeconds
      many += batch.length
      if (endedAt(done.signal, done.cpuSeconds, bound)) ended = true
      if (signal !== null) continue
      if (done.signal !== null) {
        code = done.code
        signal = done.signal
        continue
      }
      if (code === 0) code = done.code
    }
  }
  const said = verdictOf(code, output, expected)
  const beyond = signal !== null || (said === "pass" && spent > CEILING * many)
  const slow = beyond ? slowIn(root, runs, naming, CEILING, over) : []
  return {
    code,
    signal,
    output,
    summary: summaryIn(output),
    verdict: judgedAs(said, slow.length, ended),
    cpuSeconds: spent,
    slow,
  }
}

export function ranOver(
  root: string,
  named: readonly string[],
  expected: number,
  name: string | null = null,
  bodies: Bodies | null = null
): Ran {
  const over = bodies === null ? null : mountedOver(root, bodies)
  try {
    return ranUnder(root, named, expected, name, over)
  } finally {
    over?.sweep()
  }
}
