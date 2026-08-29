import { existsSync, readdirSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import type { Answer, Given, Surface } from "../../calling.module.code.ts"

const FILE_PATH = "--file-path"

const INSIDE = "akasha"

const SUFFIX = ".test.ts"

const RUNNER = "bun"

const RUNS = "test"

const ESCAPE = String.fromCharCode(27)

export const ANSWER_CEILING = 28000

export const surface: Surface = {
  taking: [
    { said: `${FILE_PATH} <path>`, takes: "a file or folder under `akasha/` whose tests run" },
  ],
  notes: [
    `${FILE_PATH} repeats, so several paths run in one call.`,
    `named nothing, it runs every test under \`${INSIDE}/\`.`,
    "a run takes no filter for which tests inside a file run.",
  ],
}

export type Verdict = "pass" | "fail" | "short" | "crash"

export type Summary = {
  readonly files: number | null
  readonly failed: number | null
  readonly passed: number | null
}

type Meant = {
  readonly paths: readonly string[]
  readonly refusal: string | null
}

type Aimed = {
  readonly named: readonly string[]
  readonly refusals: readonly string[]
}

function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ paths: [], refusal: said })
  const paths: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) return refused(`${FILE_PATH} names a path, and nothing followed it`)
      paths.push(value)
      at += 1
      continue
    }
    return refused(`\`${one}\` is not an argument this takes — it takes \`${FILE_PATH} <path>\``)
  }
  return { paths, refusal: null }
}

export function aiming(paths: readonly string[], given: Given): Aimed {
  const root = resolve(given.root)
  const bound = join(root, INSIDE)
  if (paths.length === 0) return { named: [INSIDE], refusals: [] }
  const named: string[] = []
  const refusals: string[] = []
  const already = new Set<string>()
  for (const one of paths) {
    const absolute = resolve(one.startsWith("/") ? one : join(given.from, one))
    if (absolute !== bound && !absolute.startsWith(`${bound}/`)) {
      refusals.push(`${one} stands outside \`${INSIDE}/\`, and this runs what stands inside it`)
      continue
    }
    if (!existsSync(absolute)) {
      refusals.push(`${one} names nothing that is there`)
      continue
    }
    if (already.has(absolute)) {
      refusals.push(`${one} is named more than once`)
      continue
    }
    already.add(absolute)
    named.push(relative(root, absolute))
  }
  return { named, refusals }
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

export function bounded(output: string): readonly string[] {
  const bytes = new TextEncoder().encode(output)
  if (bytes.length <= ANSWER_CEILING) return output.split("\n")
  const dropped = bytes.length - ANSWER_CEILING
  const kept = new TextDecoder().decode(bytes.subarray(dropped))
  return [
    `the first ${dropped} bytes of this run are not here — one answer holds ${ANSWER_CEILING}, and ` +
      "the end is where the summary stands. Name fewer paths to see the rest.",
    ...kept.split("\n").slice(1),
  ]
}

function running(root: string, named: readonly string[]): { code: number; output: string } {
  const done = Bun.spawnSync([RUNNER, RUNS, ...named], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: done.exitCode, output: `${done.stdout.toString()}${done.stderr.toString()}` }
}

function toldOf(verdict: Verdict, said: Summary, expected: number, code: number): readonly string[] {
  if (verdict === "fail") {
    return [`${said.failed} of ${(said.passed ?? 0) + (said.failed ?? 0)} tests failed.`]
  }
  if (verdict === "short") {
    return [
      `${said.files} of the ${expected} test files under what was named ran, so the ones that did ` +
        "pass say nothing about the rest. A file that will not load is counted here as not run.",
    ]
  }
  return [
    `the run printed no summary, so nothing says the tests ran at all — it exited ${code}. ` +
      "This is the runner failing, not a test.",
  ]
}

export function test(argv: readonly string[], given: Given): Answer {
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const root = resolve(given.root)
  const aimed = aiming(meant.paths, given)
  if (aimed.refusals.length > 0) return { report: [], refusals: aimed.refusals, code: 1 }
  const expected = aimed.named.reduce((held, one) => held + testsUnder(join(root, one)), 0)
  if (expected === 0) {
    return {
      report: [],
      refusals: [`no file under \`${aimed.named.join("`, `")}\` is a test, so nothing was run`],
      code: 1,
    }
  }
  const done = running(root, aimed.named)
  const said = summaryIn(done.output)
  const verdict = verdictOf(done.code, done.output, expected)
  const report = [...bounded(done.output)]
  if (verdict === "pass") return { report, refusals: [], code: 0 }
  return {
    report,
    refusals: [...toldOf(verdict, said, expected, done.code)],
    code: verdict === "fail" ? 1 : 3,
  }
}
