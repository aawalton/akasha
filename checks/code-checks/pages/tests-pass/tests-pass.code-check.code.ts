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
import { SERVED, servingOf } from "@akasha/code/test-bodies"
import type { Bodies } from "@akasha/code/test-overlay"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { endingOf } from "@akasha/utils-run/running"
import {
  input,
  type Selector,
  TEXTS,
  type Text,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

function testedBeside(path: string, shadow: Shadow): boolean {
  for (const beside of testsBesideOf(path)) {
    if (beside === path) return true
    if (shadow.index.listedByPath(beside).length > 0) return true
  }
  return false
}

const TESTED: Selector<Text> = {
  named: "texts a test stands beside",
  isInput: testedBeside,
  from: (change, shadow) =>
    TEXTS.from(change, shadow).filter((one) => testedBeside(one.path, shadow)),
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

const MEND = "The tests themselves are green. Make the file cheaper or divide it."

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
  return output.replaceAll(`${SERVED}:${root}/`, "").replaceAll(`${root}/`, "")
}

export function bodiesOf(change: Change): Bodies {
  const held: Record<string, Uint8Array | null> = {}
  for (const one of change.changed) held[one] = change.after(one)
  return held
}

function refusalsIn(change: Change): readonly Judged[] {
  if (alreadyRunning()) return []
  const named = namedIn(change)
  const first = named[0]
  if (first === undefined) return []
  const bodies = bodiesOf(change)
  const serving = servingOf(change.root, change.changed, change.after, named, change.before)
  try {
    if (measuring())
      return [{ path: first, reason: spentlyOf(spentOver(change.root, named, serving, bodies)) }]
    const found = ranOver(change.root, named, named.length, null, serving, bodies)
    if (found.verdict === "pass") return []
    const said = { ...found, output: spelledIn(found.output, serving.root) }
    const at = said.slow[0]?.path ?? first
    return [{ path: at, reason: reasonOf(said, named) }]
  } finally {
    serving.sweep()
  }
}

export const testsPass = input(TESTED, refusalsIn)
