import { existsSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { textIn } from "../../../code-system/body-text/body-text.module.code.ts"
import type { Summary, Verdict } from "../../../code-system/code-tests/code-tests.module.code.ts"
import { ranOver, testsUnder } from "../../../code-system/code-tests/code-tests.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"

const FILE_PATH = "--file-path"

const INSIDE = "akasha"

export const ANSWER_CEILING = 28000

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

export function bounded(output: string): readonly string[] {
  const bytes = new TextEncoder().encode(output)
  if (bytes.length <= ANSWER_CEILING) return output.split("\n")
  const dropped = bytes.length - ANSWER_CEILING
  const kept = textIn(bytes.subarray(dropped))
  return [
    `the first ${dropped} bytes of this run are not here — one answer holds ${ANSWER_CEILING}, and ` +
      "the end is where the summary stands. Name fewer paths to see the rest.",
    ...kept.split("\n").slice(1),
  ]
}

function toldOf(
  verdict: Verdict,
  said: Summary,
  expected: number,
  code: number
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
  const done = ranOver(root, aimed.named, expected)
  const report = [...bounded(done.output)]
  if (done.verdict === "pass") return { report, refusals: [], code: 0 }
  return {
    report,
    refusals: [...toldOf(done.verdict, done.summary, expected, done.code)],
    code: done.verdict === "fail" ? 1 : 3,
  }
}
