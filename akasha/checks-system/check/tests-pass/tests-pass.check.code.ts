import type { Ran } from "../../../code-system/code-tests/code-tests.module.code.ts"
import {
  alreadyRunning,
  plain,
  ranOver,
  testBesideOf,
  worldOf,
} from "../../../code-system/code-tests/code-tests.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { everyFileIn } from "../../checking/checking.module.code.ts"
import type { Change, Judged } from "../../judging/judging.module.code.ts"

const KEPT = 40

export function namedIn(change: Change): readonly string[] {
  const held = new Set<string>()
  for (const one of change.changed) {
    const beside = testBesideOf(one)
    if (beside === null) continue
    if (change.after(beside) === null) continue
    held.add(beside)
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

export function testsPass(change: Change, shadow: Shadow): readonly Judged[] {
  if (alreadyRunning()) return []
  const named = namedIn(change)
  const first = named[0]
  if (first === undefined) return []
  const over = [...new Set([...everyFileIn(change.root, shadow.reading), ...change.changed])]
  const world = worldOf(change.root, over, change.after)
  try {
    const ran = ranOver(world.root, named, named.length)
    if (ran.verdict === "pass") return []
    const said = { ...ran, output: ran.output.replaceAll(`${world.root}/`, "") }
    return [{ path: first, reason: reasonOf(said, named) }]
  } finally {
    world.sweep()
  }
}
