#!/usr/bin/env bun

import { existsSync, realpathSync } from "node:fs"
import { resolve } from "node:path"
import { opsArgv, opsInvocationOf } from "../../../tools/lib/ops-invocation.ts"
import { decideCheckExit } from "./lib/run-check-core.ts"
import { EXIT_TOOL_ERROR } from "../../../tools/lib/check-workflow/violation-reporter.ts"

const PREFIX = "[run-check]"

const OWN_ROOT = realpathSync(resolve(import.meta.dir, "../../.."))

function named(root: string | undefined): string {
  return root === undefined || root === "" ? "unset" : root
}

function locate(script: string): string | null {
  for (const root of [
    OWN_ROOT,
    process.env.WORKSPACE,
    process.env.AKASHA_ROOT,
    process.cwd(),
  ]) {
    if (root === undefined || root === "") continue
    const candidate = resolve(root, script)
    if (existsSync(candidate)) return candidate
  }
  return null
}

function invocationOf(found: string, args: readonly string[]): string[] {
  const command = opsInvocationOf(found)
  return command === null ? ["bun", found, ...args] : [...opsArgv(command), ...args]
}

const [script, ...args] = Bun.argv.slice(2)

if (script === undefined) {
  process.stderr.write(`${PREFIX} usage: run-check.ts <check-script> [args…]\n`)
  process.exit(EXIT_TOOL_ERROR)
}

const found = locate(script)

if (found === null) {
  process.stderr.write(
    `${PREFIX} ${script} stands in no tree this runner can reach — not under ${OWN_ROOT}, not ` +
      `under WORKSPACE (${named(process.env.WORKSPACE)}), not under AKASHA_ROOT ` +
      `(${named(process.env.AKASHA_ROOT)}), not under ${process.cwd()}. A check body ` +
      `and the tree it reads need not be in the same repository, so the runner looks in each of ` +
      `them rather than only in the one it was invoked from. Reporting ${EXIT_TOOL_ERROR} (tool ` +
      `error), not a violation.\n`
  )
  process.exit(EXIT_TOOL_ERROR)
}

const proc = Bun.spawn(invocationOf(found, args), { stdout: "inherit", stderr: "pipe" })
const [stderr] = await Promise.all([new Response(proc.stderr).text(), proc.exited])
process.stderr.write(stderr)

const exit = decideCheckExit({ exitCode: proc.exitCode, stderr })

if (exit === EXIT_TOOL_ERROR && proc.exitCode !== EXIT_TOOL_ERROR) {
  process.stderr.write(
    `${PREFIX} ${script} never ran — it exited ${proc.exitCode ?? `on signal ${proc.signalCode}`} ` +
      `without producing a verdict. Reporting ${EXIT_TOOL_ERROR} (tool error), not a violation.\n`
  )
}

process.exit(exit)
