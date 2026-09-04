import type { FunctionalType } from "../functional-type/functional-type.module.code.ts"
import { isLibraryType } from "../functional-type/functional-type.module.code.ts"
import {
  validateExcludeShape,
  validateNoOutDir,
  validateSourceLayout,
} from "../tsconfig-source-layout/tsconfig-source-layout.module.code.ts"

export interface Violation {
  readonly rule: string
  readonly workspace: string
  readonly message: string
}

export interface EvaluateInput {
  readonly workspace: string
  readonly tsconfig: Record<string, unknown>
  readonly functionalType: FunctionalType
  readonly drains: TsconfigDrains
}

export interface TsconfigDrains {
  readonly nonCanonicalInclude: ReadonlySet<string>
  readonly allowImportingTsExtensions: ReadonlySet<string>
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null
}

function asRecord(x: unknown): Record<string, unknown> {
  return isRecord(x) ? x : {}
}

export function evaluateTsconfigConventions(input: EvaluateInput): readonly Violation[] {
  const { workspace, tsconfig, functionalType, drains } = input
  const violations: Violation[] = []
  const compilerOptions = asRecord(tsconfig.compilerOptions)

  if (functionalType !== "addon") {
    const extRaw = tsconfig.extends
    const ext = typeof extRaw === "string" ? extRaw : undefined
    if (ext == null || !ext.endsWith("tsconfig.base.json")) {
      violations.push({
        rule: "extends",
        workspace,
        message: `"${workspace}" does not extend tsconfig.base.json`,
      })
    }
  }

  if (functionalType !== "next-app" && functionalType !== "addon") {
    if (compilerOptions.composite !== true) {
      violations.push({
        rule: "composite",
        workspace,
        message: `"${workspace}" is missing composite: true`,
      })
    }
    if (compilerOptions.emitDeclarationOnly !== true) {
      violations.push({
        rule: "emitDeclarationOnly",
        workspace,
        message: `"${workspace}" is missing emitDeclarationOnly: true`,
      })
    }
  }

  if (!drains.allowImportingTsExtensions.has(workspace)) {
    if (compilerOptions.allowImportingTsExtensions === true) {
      violations.push({
        rule: "allowImportingTsExtensions",
        workspace,
        message: `"${workspace}" has allowImportingTsExtensions: true`,
      })
    }
  }

  if (isLibraryType(functionalType)) {
    const outDirViolation = validateNoOutDir(workspace, tsconfig)
    if (outDirViolation) violations.push(outDirViolation)
  }

  if (isLibraryType(functionalType) && !drains.nonCanonicalInclude.has(workspace)) {
    const layoutViolation = validateSourceLayout(workspace, tsconfig)
    if (layoutViolation) violations.push(layoutViolation)
  }

  if (isLibraryType(functionalType)) {
    const excludeViolation = validateExcludeShape(workspace, tsconfig)
    if (excludeViolation) violations.push(excludeViolation)
  }

  return violations
}
