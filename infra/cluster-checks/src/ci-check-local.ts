#!/usr/bin/env bun

import { getRepoRoot } from "../../../akasha/checks/cluster-checks/modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../../akasha/checks/cluster-checks/modules/retired/retired.module.code.ts"
import { routedCheckArgv } from "../../../tools/lib/check-workflow/run-check-routing.ts"
import { emitVerdict } from "../../../tools/lib/verdict-channel"
import {
  decideLocalCheckExit,
  decideLocalCheckVerdict,
  type LocalCheckResult,
  localStatusForCheckExit,
} from "./lib/local-check-verdict"

if (import.meta.main) refuseRetired()

const ROOT = getRepoRoot()

const green = (s: string) => `\x1b[32m${s}\x1b[0m`
const red = (s: string) => `\x1b[31m${s}\x1b[0m`
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`

const results: LocalCheckResult[] = []

{
  const name = "Shellcheck"
  console.log(bold(`\n── ${name} ──`))

  const proc = Bun.spawnSync(
    [...routedCheckArgv({ script: "infra/cluster-checks/src/checks/check-shellcheck.ts" })],
    { cwd: ROOT, stdout: "inherit", stderr: "inherit" }
  )
  const status = localStatusForCheckExit(proc.exitCode)
  if (status === "skip") console.log(yellow("shellcheck did not run — see its output above"))
  results.push({
    name,
    status,
    detail:
      status === "skip"
        ? "check-shellcheck exited on the tool-error channel — it judged no shell script"
        : "every tracked .sh file, as the `sh-file` producer enumerates them",
  })
}

{
  const name = "RBAC generation"
  console.log(bold(`\n── ${name} ──`))

  const proc = Bun.spawnSync(["bun", "packages/infra/ci/workflows/src/generate-rbac.ts"], {
    cwd: ROOT,
    stdout: "pipe",
    stderr: "inherit",
  })

  if (proc.exitCode !== 0) {
    console.log(red("generate-rbac.ts failed"))
    results.push({ name, status: "fail", detail: "generate-rbac.ts exited non-zero" })
  } else {
    console.log("generate-rbac.ts runs successfully")
    results.push({ name, status: "pass", detail: "generate-rbac.ts runs clean" })
  }
}

{
  const name = "Dep versions"
  console.log(bold(`\n── ${name} ──`))
  const proc = Bun.spawnSync(
    [...routedCheckArgv({ script: "infra/cluster-checks/src/checks/check-dep-versions.ts" })],
    {
      cwd: ROOT,
      stdout: "inherit",
      stderr: "inherit",
    }
  )
  const status = localStatusForCheckExit(proc.exitCode)
  results.push({
    name,
    status,
    detail:
      status === "skip"
        ? `check-dep-versions.ts could not run (exit ${proc.exitCode}); the workspace is unexamined`
        : "check-dep-versions.ts across the workspace",
  })
}

console.log(bold("\n── Summary ──"))
for (const r of results) {
  const icon =
    r.status === "pass" ? green("PASS") : r.status === "fail" ? red("FAIL") : yellow("SKIP")
  console.log(`  ${icon}  ${r.name} — ${r.detail}`)
}

const verdict = decideLocalCheckVerdict(results, Date.now())
console.log("")
emitVerdict(verdict)
process.exit(decideLocalCheckExit(verdict))
