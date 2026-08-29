import { existsSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { besideAt } from "../pages-system/page/page-file-name.module.code.ts"

const SUFFIX = ".test.ts"

const CODE = ".code.ts"

const TS = ".ts"

const TEST = "test"

const HELD = "ts"

const RUNNER = "bun"

const RUNS = "test"

const ESCAPE = String.fromCharCode(27)

const MARK = "1"

export const RUNNING = "AKASHA_TESTS_RUNNING"

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

export function alreadyRunning(): boolean {
  return process.env[RUNNING] === MARK
}

export function testsUnder(absolute: string): number {
  if (!existsSync(absolute)) return 0
  if (statSync(absolute).isFile()) return absolute.endsWith(SUFFIX) ? 1 : 0
  let held = 0
  for (const one of readdirSync(absolute, { withFileTypes: true })) {
    if (one.isDirectory()) held += testsUnder(join(absolute, one.name))
    else if (one.isFile() && one.name.endsWith(SUFFIX)) held += 1
  }
  return held
}

export function testBesideOf(path: string): string | null {
  if (path.endsWith(SUFFIX)) return path
  const page = path.endsWith(CODE) ? `${path.slice(0, -CODE.length)}${TS}` : path
  return besideAt(page, TEST, HELD)
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

export function ranOver(root: string, named: readonly string[], expected: number): Ran {
  const done = Bun.spawnSync([RUNNER, RUNS, ...named], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, [RUNNING]: MARK },
  })
  const output = `${done.stdout.toString()}${done.stderr.toString()}`
  return {
    code: done.exitCode,
    output,
    summary: summaryIn(output),
    verdict: verdictOf(done.exitCode, output, expected),
  }
}
