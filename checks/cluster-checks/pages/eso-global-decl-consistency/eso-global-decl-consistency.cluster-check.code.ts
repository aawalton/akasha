#!/usr/bin/env bun

import { readdirSync, readFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  collectGeneratedGlobalFns,
  collectGeneratedObjectMethods,
  collectGlobalCallableDecls,
  type EsoFalseGlobalFinding,
  findFalseGlobalDecls,
} from "../../modules/eso-global-decl-consistency/eso-global-decl-consistency.module.code.ts"
import {
  examineFilePopulation,
  type Population,
} from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[eso-global-decl-consistency]"
const ESO_REL = "temper/addons/types/eso"
const ADDON_TREE_REL = "temper"
const NOT_HAND_WRITTEN_DIRS: ReadonlySet<string> = new Set(["node_modules", "dist", "generated"])
const SUCCESS_MESSAGE = "No hand-written ESO global decls contradict the generated object surface."

function messageOf(v: EsoFalseGlobalFinding): string {
  return `\`declare ${v.keyword} ${v.name}\` is a false global — the generated surface exposes \`${v.name}\` only as an object method; route through \`GetAddOnManager()\` (or the owning manager) and delete this decl`
}

function formatViolation(v: EsoFalseGlobalFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

function handWrittenDeclFiles(repoRoot: string, root: string): readonly string[] {
  const out: string[] = []
  const walk = (dir: string): undefined => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!NOT_HAND_WRITTEN_DIRS.has(entry.name)) walk(join(dir, entry.name))
        continue
      }
      if (entry.isFile() && entry.name.endsWith(".d.ts")) {
        out.push(relative(repoRoot, join(dir, entry.name)))
      }
    }
    return
  }
  walk(root)
  return out.sort()
}

function main(): undefined {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), { ...STANDARD_FLAGS }, { passthrough: true })
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  const esoDir = join(repoRoot, ESO_REL)

  let population: Population
  let findings: readonly EsoFalseGlobalFinding[]
  try {
    const objectsSrc = readFileSync(join(esoDir, "generated", "objects.d.ts"), "utf8")
    const functionsSrc = readFileSync(join(esoDir, "generated", "functions.d.ts"), "utf8")
    const methodNames = collectGeneratedObjectMethods(objectsSrc)
    const globalFnNames = collectGeneratedGlobalFns(functionsSrc)

    const manualFiles = handWrittenDeclFiles(repoRoot, join(repoRoot, ADDON_TREE_REL))

    const examined = examineFilePopulation<EsoFalseGlobalFinding>({
      files: manualFiles,
      unit: "declaration files",
      membership: {
        kind: "enumerated",
        because:
          "the members are the `handWrittenDeclFiles` walk of `temper` above, which holds no catch and raises out onto `exitOnToolError` in the same `try` when any directory under it will not open, so a shorter list is fewer hand-written `.d.ts` files in the addon tree",
      },
      pathOf: (rel) => join(repoRoot, rel),
      scan: (rel, source) =>
        findFalseGlobalDecls({
          manual: collectGlobalCallableDecls(rel, source),
          methodNames,
          globalFnNames,
        }),
    })
    population = examined.population
    findings = examined.violations
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `false ESO global decls — ${findings.length.toLocaleString()} finding(s)`,
      successMessage: SUCCESS_MESSAGE,
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main()
}
