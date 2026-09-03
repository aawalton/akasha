#!/usr/bin/env bun

import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import {
  loadRepoContext,
  parseArgs,
} from "../../modules/check-unused-deps-context/check-unused-deps-context.module.code.ts"
import { findingsForWorkspace } from "../../modules/check-unused-deps-credit/check-unused-deps-credit.module.code.ts"
import type {
  CliArgs,
  Finding,
  RepoContext,
} from "../../modules/check-unused-deps-types/check-unused-deps-types.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-unused-deps]"

const ROOT_LABEL = "<root>"

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

async function main(): Promise<never> {
  let args: CliArgs
  try {
    args = parseArgs()
  } catch (err) {
    return toolExit(errorMessage(err))
  }

  let ctx: RepoContext
  let findings: Finding[]
  try {
    ctx = await loadRepoContext(args)
    findings = []
    for (const ws of ctx.workspaces) findings.push(...findingsForWorkspace(ws, ctx))
  } catch (err) {
    const trace = err instanceof Error && err.stack != null ? err.stack : errorMessage(err)
    return toolExit(`fatal: ${trace}`)
  }

  return exitOnResult<Finding & Violation>({
    violations: findings,
    options: {
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Unused npm dependencies",
      successMessage: "OK — zero unused npm deps.",
      population: ctx.population,
      groupBy: (f) => `${f.workspace} (${f.workspaceRoot !== "" ? f.workspaceRoot : ROOT_LABEL})`,
      formatViolation: (f) => `[${f.depType}] ${f.dep} — ${f.reason}`,
      footer: (count) =>
        `${PREFIX} ${count} unused dependency finding(s) — delete the dep from the workspace's package.json, or add a real use of it.`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
