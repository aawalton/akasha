import type { Ran } from "@akasha/code-system/code-tests"
import {
  alreadyRunning,
  plain,
  ranOver,
  testsBesideOf,
  worldOf,
} from "@akasha/code-system/code-tests"
import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import {
  everyFileOf,
  input,
  type Selector,
  TEXTS,
  type Text,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const KEPT = 40

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

export function tailOf(output: string): string {
  const lines = plain(output)
    .split("\n")
    .filter((one) => one.trim() !== "")
  return lines.slice(-KEPT).join("\n")
}

export function counted(many: number): string {
  return many === 1 ? "1 test file" : `${many} test files`
}

export function reasonOf(ran: Ran, named: readonly string[]): string {
  const over = `${counted(named.length)} standing beside what this change carries`
  if (ran.verdict === "fail") {
    const held = (ran.summary.passed ?? 0) + (ran.summary.failed ?? 0)
    return `${ran.summary.failed} of ${held} tests failed, over ${over}:\n${tailOf(ran.output)}`
  }
  if (ran.verdict === "short") {
    return (
      `${ran.summary.files} of the ${named.length} test files named ran, so the ones that did ` +
      `pass say nothing about the rest. A file that will not load is counted here as not run:\n${tailOf(ran.output)}`
    )
  }
  return (
    `the run printed no summary, so nothing says the tests ran at all — it exited ${ran.code}. ` +
    `This is the runner failing, not a test:\n${tailOf(ran.output)}`
  )
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  if (alreadyRunning()) return []
  const named = namedIn(change)
  const first = named[0]
  if (first === undefined) return []
  const over = [...new Set([...everyFileOf(shadow.index), ...change.changed])]
  const world = worldOf(change.root, over, change.after, shadow.filed())
  try {
    const ran = ranOver(world.root, named, named.length)
    if (ran.verdict === "pass") return []
    const said = { ...ran, output: ran.output.replaceAll(`${world.root}/`, "") }
    return [{ path: first, reason: reasonOf(said, named) }]
  } finally {
    world.sweep()
  }
}

export const testsPass = input(TESTED, refusalsIn)
