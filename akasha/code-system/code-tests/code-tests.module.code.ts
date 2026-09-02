import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, relative, sep } from "node:path"
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

const MANIFEST = "package.json"

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

export function alreadyRunning(): boolean {
  return process.env[RUNNING] === MARK
}

export function testNamed(path: string): boolean {
  return SUFFIXES.some((one) => path.endsWith(one))
}

export function testsUnder(absolute: string): number {
  if (!existsSync(absolute)) return 0
  if (statSync(absolute).isFile()) return testNamed(absolute) ? 1 : 0
  let held = 0
  for (const one of readdirSync(absolute, { withFileTypes: true })) {
    if (one.isDirectory()) held += testsUnder(join(absolute, one.name))
    else if (one.isFile() && testNamed(one.name)) held += 1
  }
  return held
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

function topOf(path: string): string | null {
  const first = path.split(sep)[0]
  if (first === undefined || first === "" || first === path) return null
  return first
}

function copyIn(
  from: string,
  root: string,
  standing: ReadonlySet<string>,
  at: string
): string | null {
  if (!existsSync(at)) return null
  const inside = relative(from, realpathSync(at))
  const top = topOf(inside)
  if (top === null || !standing.has(top)) return null
  const found = join(root, inside)
  return existsSync(join(found, MANIFEST)) ? found : null
}

function packagesIn(
  from: string,
  root: string,
  standing: ReadonlySet<string>
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const live = join(from, MODULES)
  const real = realpathSync(from)
  for (const one of readdirSync(live)) {
    const named = join(live, one)
    if (!one.startsWith(SCOPE)) {
      const to = copyIn(real, root, standing, named)
      if (to !== null) found.set(one, to)
      continue
    }
    if (!existsSync(named)) continue
    for (const member of readdirSync(named)) {
      const to = copyIn(real, root, standing, join(named, member))
      if (to !== null) found.set(`${one}${sep}${member}`, to)
    }
  }
  return found
}

function modulesInto(from: string, root: string, standing: ReadonlySet<string>): undefined {
  if (!existsSync(join(from, MODULES))) return
  symlinkSync(join(from, MODULES), join(root, MODULES))
  for (const [named, to] of packagesIn(from, root, standing)) {
    for (const one of standing) {
      const at = join(root, one, MODULES, named)
      mkdirSync(dirname(at), { recursive: true })
      symlinkSync(to, at)
    }
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

function rootMade(): string {
  try {
    return mkdtempSync(join(HOLD, PREFIX))
  } catch (thrown) {
    throw new Error(`no world could be made under ${HOLD} — ${saidOf(thrown)}`)
  }
}

export function worldOf(
  from: string,
  paths: readonly string[],
  at: (path: string) => Uint8Array | null,
  filed: readonly Filing[] | null
): World {
  const root = rootMade()
  try {
    const tops = new Set<string>()
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
      const top = topOf(one)
      if (top !== null) tops.add(top)
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
    reaching(root, `the modules under ${from} would not be linked`, () =>
      modulesInto(from, root, tops)
    )
  } catch (thrown) {
    rmSync(root, { recursive: true, force: true })
    throw thrown
  }
  return {
    root,
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}

export function ranOver(root: string, named: readonly string[], expected: number): Ran {
  const done = ran([RUNNER, RUNS, ...named], {
    cwd: root,
    env: { ...process.env, [RUNNING]: MARK },
  })
  const output = `${done.out}${done.err}`
  return {
    code: done.code,
    output,
    summary: summaryIn(output),
    verdict: verdictOf(done.code, output, expected),
  }
}
