#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { repoDoc } from "../../../../../tools/lib/check-workflow/remediation-doc"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"
import {
  type ContractCouplingViolation,
  findContractImports,
  findModuleContractSchemas,
  findUncoupledContracts,
  isExcludedTestFile,
  type ModuleContractSchema,
  uncoupledImportedContract,
} from "../../modules/cli-json-contract-coupling/cli-json-contract-coupling.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[cli-json-contract-coupling]"

const MODULE_CANDIDATES: readonly string[] = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]

function resolveRelativeModule(fromAbsolutePath: string, specifier: string): string | null {
  const repoRoot = getRepoRoot()
  const base = resolve(dirname(fromAbsolutePath), specifier)
  for (const candidate of MODULE_CANDIDATES) {
    const path = `${base}${candidate}`
    if (!path.endsWith(".ts") && !path.endsWith(".tsx")) continue
    if (existsSync(path)) return relative(repoRoot, path)
  }
  return null
}

function main(): never {
  const repoRoot = getRepoRoot()
  const pathOf = (rel: string): string => `${repoRoot}/${rel}`

  const moduleSchemas = new Map<string, readonly ModuleContractSchema[]>()
  const schemasOf = (rel: string): readonly ModuleContractSchema[] => {
    const cached = moduleSchemas.get(rel)
    if (cached !== undefined) return cached
    const found = findModuleContractSchemas({
      source: readFileSync(pathOf(rel), "utf-8"),
      filePath: rel,
    })
    moduleSchemas.set(rel, found)
    return found
  }

  const scanImportedModules = (
    testFile: string,
    source: string
  ): readonly ContractCouplingViolation[] => {
    const violations: ContractCouplingViolation[] = []
    for (const contractImport of findContractImports({ source, filePath: testFile })) {
      const modulePath = resolveRelativeModule(pathOf(testFile), contractImport.specifier)
      if (modulePath === null) continue
      if (isExcludedTestFile(modulePath)) continue
      const taken = new Set(contractImport.names)
      for (const schema of schemasOf(modulePath)) {
        if (schema.coupled || !taken.has(schema.schemaName)) continue
        violations.push(
          uncoupledImportedContract({ filePath: modulePath, schema, importedBy: testFile })
        )
      }
    }
    return violations
  }

  const { population, violations } = examineFilePopulation<ContractCouplingViolation>({
    files: findFiles({
      cwd: repoRoot,
      patterns: ["**/*.test.ts", "**/*.test.tsx"],
      absolute: false,
    }).filter(isExcludedTestFile),
    unit: "test files",
    membership: {
      kind: "enumerated",
      because:
        "`findFiles` globs the repo root through `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, so fewer files means fewer test files on disk",
    },
    pathOf,
    scan: (label, source) => [
      ...findUncoupledContracts({ source, filePath: label }),
      ...scanImportedModules(label, source),
    ],
  })

  const seen = new Set<string>()
  const distinct = violations.filter((violation) => {
    const key = `${violation.file}:${violation.schemaName}:${violation.line}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  exitOnResult({
    violations: distinct,
    options: {
      population,
      prefix: PREFIX,
      header:
        "Cross-boundary contract schema(s) asserted by a .strict() Zod schema that no typecheck compares against its producer, read by a test in a CI-excluded class. The rule: a contract a CI-excluded test asserts is typechecked against the code producing it, so drift fails on a rung CI runs",
      remediationDoc: repoDoc(
        "akasha/checks/cluster-checks/modules/cli-json-contract-coupling/cli-json-contract-coupling.module.code.ts"
      ),
      successMessage: `OK — ${population.examined.length} CI-excluded test files scanned and ${moduleSchemas.size} imported module(s) opened, no uncoupled contracts.`,
      formatViolation: (violation) =>
        violation.importedBy === null
          ? `${violation.file}:${violation.line} — local strict contract "${violation.schemaName}" in a CI-excluded test; import a producer-coupled schema or use .passthrough()`
          : `${violation.file}:${violation.line} — strict contract "${violation.schemaName}" read by ${violation.importedBy} and coupled to nothing; add satisfies z.ZodType<ProducerType> or a z.infer alias the producer is annotated against`,
    },
  })
}

main()
