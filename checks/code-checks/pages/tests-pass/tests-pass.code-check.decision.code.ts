import { basename, dirname, join, relative } from "node:path"
import type { Ran, Spent } from "@akasha/code/code-tests"
import {
  alreadyRunning,
  CEILING,
  measuring,
  plain,
  ranOver,
  spentOver,
  testsBesideOf,
} from "@akasha/code/code-tests"
import { calledIn } from "@akasha/code/package-manifest"
import type { Bodies, Body, Link } from "@akasha/code/test-overlay"
import { bodiesFrom } from "@akasha/indexes/rebuilding"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { endingOf } from "@akasha/utils/run/running"
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

export function reasonOf(ran: Ran, named: readonly string[]): string {
  const over = `${counted(named.length)} standing beside what this change carries`
  if (ran.verdict === "slow") return slowlyOf(ran)
  if (ran.verdict === "fail") {
    const held = (ran.summary.passed ?? 0) + (ran.summary.failed ?? 0)
    return `${ran.summary.failed} of ${held} tests failed, over ${over}:\n${saidOf(ran.output)}`
  }
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
  const at = said.slow[0]?.path ?? first
  return [{ path: at, reason: reasonOf(said, named) }]
}
