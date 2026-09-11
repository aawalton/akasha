import { basename, dirname, join, relative } from "node:path"
import type { Ran, Spent } from "akasha/code-system/code-tests/code-tests.module.code.ts"
import {
  alreadyRunning,
  CEILING,
  errorsIn,
  measuring,
  plain,
  ranOver,
  spentOver,
  testsBesideOf,
} from "akasha/code-system/code-tests/code-tests.module.code.ts"
import { calledIn } from "akasha/code-system/package-manifest/package-manifest.module.code.ts"
import type {
  Bodies,
  Body,
  Link,
} from "akasha/code-system/test-overlay/test-overlay.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { bodiesFrom } from "akasha/pages/indexes/rebuilding/rebuilding.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { endingOf } from "akasha/utils/run/running/running.module.code.ts"
import { textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export function testedBeside(path: string, shadow: Shadow): boolean {
  for (const beside of testsBesideOf(path)) {
    if (beside === path) return true
    if (shadow.index.listedByPath(beside).length > 0) return true
  }
  return false
}

export function namedIn(change: Change): readonly string[] {
  const held = new Set<string>()
  for (const one of change.changed) {
    for (const beside of testsBesideOf(one)) {
      if (change.after(beside) === null) continue
      held.add(beside)
    }
  }
  return [...held].sort()
}

export function saidOf(output: string): string {
  return plain(output)
    .split("\n")
    .filter((one) => one.trim() !== "")
    .join("\n")
}

export function counted(many: number): string {
  return many === 1 ? "1 test file" : `${many} test files`
}

const SHOWN = 1

export function spentlyOf(spent: readonly Spent[]): string {
  const held = spent
    .map((one) => {
      const said = `${one.path} spent ${one.cpuSeconds.toFixed(SHOWN)} processor seconds`
      if (one.code === 0 && one.signal === null) return said
      return `${said}, and did not come back clean, so read that file's seconds as nothing`
    })
    .join("\n")
  return (
    `every test file this change names ran on its own with no ceiling:\n${held}\n\n` +
    `Nothing landed. A test file may spend ${String(CEILING)} processor seconds.`
  )
}

const MEND =
  "The tests themselves are green. Deleting a test nothing needs is the best way to make a file cheaper, so look for one first. Then make the tests that are left cheaper. Divide the file last."

export function slowlyOf(ran: Ran): string {
  const given = `a test file is given ${String(CEILING)} processor seconds`
  if (ran.slow.length === 0)
    return (
      `${given}, and the run of the files this change names was ended for going past what ` +
      `those files may spend together, at ${ran.cpuSeconds.toFixed(SHOWN)} processor seconds. ` +
      `Running each of those files on its own put none of them past the ceiling.\n\n${MEND}`
    )
  const held = ran.slow
    .map((one) => `${one.path} spent ${one.cpuSeconds.toFixed(SHOWN)} processor seconds`)
    .join("\n")
  return `${given}, and ${counted(ran.slow.length)} went past that:\n${held}\n\n${MEND}`
}

const NAMES = ":"

const HEADED = /^\S+\.tsx?:$/

const BLAMES: readonly RegExp[] = [/^\(fail\)/, /^# Unhandled error/]

const BOUNDS = /^bun test v|^Ran \d+ tests? across \d+ files?/

export function failedIn(output: string, named: readonly string[]): readonly string[] {
  const held = new Set(named)
  const seen = new Set<string>()
  const found: string[] = []
  let under: string | null = null
  for (const line of plain(output).split("\n")) {
    const one = line.trimEnd()
    if (BOUNDS.test(one)) {
      under = null
      continue
    }
    if (HEADED.test(one)) {
      const at = one.slice(0, -NAMES.length)
      under = held.has(at) ? at : null
      continue
    }
    if (under === null || seen.has(under)) continue
    if (!BLAMES.some((shape) => shape.test(one))) continue
    seen.add(under)
    found.push(under)
  }
  return found
}

const UNNAMED =
  "The output prints no failure under any file the run named, so this refusal is filed against the first test file named rather than against a file that failed. Which file failed is in the output below, in a shape nothing here reads."

function erroring(many: number): string {
  return many === 1 ? "1 error was" : `${many} errors were`
}

function countingOf(ran: Ran): string {
  const raised = errorsIn(ran.output) ?? 0
  const failed = ran.summary.failed
  const many = (ran.summary.passed ?? 0) + (failed ?? 0)
  const said = `${failed} of ${many} tests failed`
  if (raised === 0) return said
  const outside = `${erroring(raised)} raised outside any test`
  return failed === 0 ? `${outside}, and no test failed` : `${said}, and ${outside}`
}

export function failinglyOf(ran: Ran, over: string, failing: readonly string[]): string {
  const said = `${countingOf(ran)}, over ${over}:\n${saidOf(ran.output)}`
  if (failing.length === 0) return `${UNNAMED}\n\n${said}`
  const blamed = ran.summary.failed === 0 ? "errored" : "failed"
  return `${counted(failing.length)} ${blamed}:\n${failing.join("\n")}\n\n${said}`
}

export function reasonOf(ran: Ran, named: readonly string[], failing: readonly string[]): string {
  const over = `${counted(named.length)} standing beside what this change carries`
  if (ran.verdict === "slow") return slowlyOf(ran)
  if (ran.verdict === "fail") return failinglyOf(ran, over, failing)
  if (ran.verdict === "short") {
    return (
      `${ran.summary.files} of the ${named.length} test files named ran, so the ones that did ` +
      `pass say nothing about the rest. A file that will not load is counted here as not run:\n${saidOf(ran.output)}`
    )
  }
  const ended = endingOf(ran.code, ran.signal)
  return (
    `the run printed no summary, so nothing says the tests ran at all — it ${ended}. ` +
    `This is the runner failing, not a test:\n${saidOf(ran.output)}`
  )
}

export function spelledIn(output: string, root: string): string {
  return output.replaceAll(`${root}/`, "")
}

const MODULES = "node_modules"

const MANIFEST = "package.json"

const ROOT = "."

export function linksIn(change: Change): ReadonlyMap<string, Link> {
  const found = new Map<string, Link>()
  for (const one of change.changed) {
    const folder = dirname(one)
    if (basename(one) !== MANIFEST || folder === ROOT) continue
    const named = calledIn(textIn(change, one))
    if (named === null) continue
    const at = join(MODULES, named)
    found.set(at, { linkedTo: relative(dirname(at), folder) })
  }
  return found
}

export function bodiesOf(change: Change, shadow: Shadow): Bodies {
  const held: Record<string, Body> = {}
  for (const one of change.changed) held[one] = change.after(one)
  for (const [at, body] of bodiesFrom(shadow.filed())) held[at] = body
  for (const [at, link] of linksIn(change)) held[at] = link
  return held
}

export function refusedOf(ran: Ran, named: readonly string[], first: string): Judged {
  const failing = failedIn(ran.output, named)
  return {
    path: ran.slow[0]?.path ?? failing[0] ?? first,
    reason: reasonOf(ran, named, failing),
  }
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  if (alreadyRunning()) return []
  const named = namedIn(change)
  const first = named[0]
  if (first === undefined) return []
  const bodies = bodiesOf(change, shadow)
  if (measuring())
    return [{ path: first, reason: spentlyOf(spentOver(change.root, named, bodies)) }]
  const found = ranOver(change.root, named, named.length, null, bodies)
  if (found.verdict === "pass") return []
  const said = { ...found, output: spelledIn(found.output, change.root) }
  return [refusedOf(said, named, first)]
}
