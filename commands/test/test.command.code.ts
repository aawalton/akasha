import { existsSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { textIn } from "@akasha/code-system/body-text"
import type { Summary, Verdict } from "@akasha/code-system/code-tests"
import { plain, ranOver, testNamed, testsUnder } from "@akasha/code-system/code-tests"
import { endingOf } from "@akasha/utils-run/running"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"

const FILE_PATH = "--file-path"

const NAMED = "--named"

const WHOLE = "."

export const ANSWER_CEILING = 28000

type Meant = {
  readonly paths: readonly string[]
  readonly name: string | null
  readonly refusal: string | null
}

type Aimed = {
  readonly named: readonly string[]
  readonly refusals: readonly string[]
}

function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ paths: [], name: null, refusal: said })
  const paths: string[] = []
  let name: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) return refused(`${FILE_PATH} names a path, and nothing followed it`)
      paths.push(value)
      at += 1
      continue
    }
    if (one === NAMED) {
      const value = argv[at + 1]
      if (value === undefined) return refused(`${NAMED} names a test, and nothing followed it`)
      if (name !== null) {
        return refused(`${NAMED} names one test, and it was given more than once`)
      }
      name = value
      at += 1
      continue
    }
    return refused(
      `\`${one}\` is not an argument this takes — it takes \`${FILE_PATH} <path>\` and ` +
        `\`${NAMED} <text>\``
    )
  }
  return { paths, name, refusal: null }
}

export function aiming(paths: readonly string[], given: Given): Aimed {
  const root = resolve(given.root)
  if (paths.length === 0) return { named: [WHOLE], refusals: [] }
  const named: string[] = []
  const refusals: string[] = []
  const already = new Set<string>()
  for (const one of paths) {
    const absolute = resolve(one.startsWith("/") ? one : join(root, one))
    if (absolute !== root && !absolute.startsWith(`${root}/`)) {
      refusals.push(`${one} sits outside the repository, and this runs what sits inside it`)
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

export function bounded(output: string): readonly string[] {
  const bytes = new TextEncoder().encode(output)
  if (bytes.length <= ANSWER_CEILING) return output.split("\n")
  const dropped = bytes.length - ANSWER_CEILING
  const kept = textIn(bytes.subarray(dropped))
  return [
    `the first ${dropped} bytes of this run are not here — one answer holds ${ANSWER_CEILING}, and ` +
      "the end is where the summary is. Name fewer paths to see the rest.",
    ...kept.split("\n").slice(1),
  ]
}

const LISTED = 20

const FAILED = "(fail) "

const UNLOADED = "# Unhandled error between tests"

const SAID = /^error:\s*(.*)$/

const NONE: Summary = { files: 0, failed: 0, passed: 0 }

const DETAIL =
  'name one test to see why: akasha test --file-path <path> --named "<the test\'s name>"'

const TAIL_LINES = 20

const TAIL_BYTES = 2000

const NO_SUMMARY = "the runner printed no summary"

type Read = {
  readonly failing: ReadonlyMap<string, number>
  readonly unloadable: ReadonlyMap<string, string>
}

function headed(line: string): string | null {
  const at = line.endsWith(":") ? line.slice(0, -1) : ""
  return testNamed(at) ? at : null
}

function readingOf(output: string): Read {
  const failing = new Map<string, number>()
  const unloadable = new Map<string, string>()
  let at = ""
  let awaiting = false
  for (const line of plain(output).split("\n")) {
    const header = headed(line)
    if (header !== null) {
      at = header
      awaiting = false
      continue
    }
    if (at === "") continue
    if (line.startsWith(FAILED)) {
      failing.set(at, (failing.get(at) ?? 0) + 1)
      continue
    }
    if (line === UNLOADED) {
      unloadable.set(at, "")
      awaiting = true
      continue
    }
    if (!awaiting) continue
    const said = SAID.exec(line)
    if (said === null) continue
    unloadable.set(at, said[1] ?? "")
    awaiting = false
  }
  return { failing, unloadable }
}

function many(count: number, one: string): string {
  return `${count} ${one}${count === 1 ? "" : "s"}`
}

function listed(head: string, lines: readonly string[]): readonly string[] {
  if (lines.length === 0) return []
  const kept = lines.slice(0, LISTED)
  const rest = lines.length - kept.length
  return [head, ...kept, ...(rest === 0 ? [] : [`  and ${rest} more`])]
}

function byPath(one: readonly [string, unknown], two: readonly [string, unknown]): number {
  return one[0] < two[0] ? -1 : 1
}

export function tailOf(output: string): readonly string[] {
  const lines = plain(output).split("\n")
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop()
  if (lines.length === 0) return [`${NO_SUMMARY}, and printed nothing at all.`]
  const kept: string[] = []
  let bytes = 0
  for (let at = lines.length - 1; at >= 0; at -= 1) {
    const line = lines[at] ?? ""
    const size = new TextEncoder().encode(line).length + 1
    if (kept.length >= TAIL_LINES || bytes + size > TAIL_BYTES) break
    kept.unshift(line)
    bytes += size
  }
  if (kept.length === 0) return [`${NO_SUMMARY}, and its last line runs past what this holds.`]
  const said =
    kept.length === lines.length
      ? `${NO_SUMMARY} — all ${many(kept.length, "line")} of what it printed:`
      : `${NO_SUMMARY} — its last ${many(kept.length, "line")}:`
  return [said, ...kept.map((one) => `  ${one}`)]
}

function reportOf(verdict: Verdict, said: Summary, output: string): readonly string[] {
  const read = readingOf(output)
  const passed = said.passed ?? 0
  const failed = said.failed ?? 0
  const loads = read.unloadable.size
  const failing = [...read.failing].sort(byPath)
  const unloadable = [...read.unloadable].sort(byPath)
  const told = [
    `${many(passed + failed, "test")} ran: ${passed} passed, ${failed} failed.` +
      (loads === 0 ? "" : ` ${many(loads, "file")} would not load.`),
    ...listed(
      `${many(failing.length, "test file")} failed:`,
      failing.map(([at, count]) => `  ${at} — ${count} failed`)
    ),
    ...listed(
      `${many(unloadable.length, "file")} would not load:`,
      unloadable.map(([at, why]) => `  ${at} — ${why}`)
    ),
  ]
  if (verdict === "crash") return [...told, ...tailOf(output)]
  return failing.length + unloadable.length === 0 ? told : [...told, DETAIL]
}

function toldOf(
  verdict: Verdict,
  said: Summary,
  expected: number,
  ended: string
): readonly string[] {
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
    `the run printed no summary, so nothing says the tests ran at all — it ${ended}. ` +
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
  if (expected === 0) return { report: [...reportOf("pass", NONE, "")], refusals: [], code: 0 }
  const weighed = meant.name === null ? expected : 0
  const done = ranOver(root, aimed.named, weighed, meant.name)
  const report = [...bounded(reportOf(done.verdict, done.summary, done.output).join("\n"))]
  if (done.verdict === "pass") return { report, refusals: [], code: 0 }
  return {
    report,
    refusals: [...toldOf(done.verdict, done.summary, expected, endingOf(done.code, done.signal))],
    code: done.verdict === "fail" ? 1 : 3,
  }
}
