import { existsSync } from "node:fs"
import { join } from "node:path"
import type { Ran } from "../../../code-system/code-tests.module.code.ts"
import {
  alreadyRunning,
  plain,
  ranOver,
  testBesideOf,
} from "../../../code-system/code-tests.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const KEPT = 40

export function namedIn(leaving: Leaving): readonly string[] {
  const held = new Set<string>()
  for (const one of leaving.changed) {
    const beside = testBesideOf(one)
    if (beside === null) continue
    if (!existsSync(join(leaving.root, beside))) continue
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

export function testsPass(leaving: Leaving): readonly Judged[] {
  if (alreadyRunning()) return []
  const named = namedIn(leaving)
  const first = named[0]
  if (first === undefined) return []
  const ran = ranOver(leaving.root, named, named.length)
  if (ran.verdict === "pass") return []
  return [{ path: first, reason: reasonOf(ran, named) }]
}
