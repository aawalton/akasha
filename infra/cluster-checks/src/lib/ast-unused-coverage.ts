import { assertNever } from "@shared/utils-narrow/assert-never"

export const OUT_OF_SCOPE_PREDICATES = ["no-typescript"] as const

export type OutOfScopePredicate = (typeof OUT_OF_SCOPE_PREDICATES)[number]

export const PENDING_CURATION_SIZE = 154

export type CoverageViolationKind =
  | "unclassified"
  | "multiply-classified"
  | "orphan-directory-missing"
  | "orphan-not-declared"
  | "predicate-falsified"
  | "ratchet-mismatch"

export interface CoverageViolation {
  readonly kind: CoverageViolationKind
  readonly message: string
  readonly file?: string
}

type ConfigList = "workspaces" | "outOfScope" | "pendingCuration"

export type WorkspaceClassification =
  | "analysed"
  | "outOfScope"
  | "pendingCuration"
  | "unclassified"
  | "multiplyClassified"

export interface CoverageTally {
  readonly declared: number
  readonly analysed: number
  readonly outOfScope: number
  readonly pendingCuration: number
  readonly unclassified: number
  readonly multiplyClassified: number
}

export interface CoverageResult {
  readonly violations: readonly CoverageViolation[]
  readonly tally: CoverageTally
}

export interface CoverageConfig {
  readonly analysed: readonly string[]
  readonly outOfScope: ReadonlyMap<string, OutOfScopePredicate>
  readonly pendingCuration: readonly string[]
}

export interface CoverageInput {
  readonly declared: readonly string[]
  readonly config: CoverageConfig
  readonly dirExists: (relPath: string) => boolean
  readonly typescriptFileCount: (relPath: string) => number
  readonly ratchetSize?: number
}

function classify(memberships: readonly ConfigList[]): WorkspaceClassification {
  const [only, ...rest] = memberships
  if (only === undefined) return "unclassified"
  if (rest.length > 0) return "multiplyClassified"
  switch (only) {
    case "workspaces":
      return "analysed"
    case "outOfScope":
      return "outOfScope"
    case "pendingCuration":
      return "pendingCuration"
    default:
      return assertNever(only)
  }
}

function predicateHolds(
  predicate: OutOfScopePredicate,
  workspace: string,
  typescriptFileCount: (relPath: string) => number
): boolean {
  switch (predicate) {
    case "no-typescript":
      return typescriptFileCount(workspace) === 0
    default:
      return assertNever(predicate)
  }
}

function describeFalsifiedPredicate(
  predicate: OutOfScopePredicate,
  workspace: string,
  typescriptFileCount: (relPath: string) => number
): string {
  switch (predicate) {
    case "no-typescript":
      return `${workspace} is declared outOfScope with predicate "no-typescript", but now contains ${typescriptFileCount(workspace)} TypeScript file(s). The exclusion's warrant is falsified: either curate it into "workspaces", or remove the TypeScript.`
    default:
      return assertNever(predicate)
  }
}

function orphanViolation(
  key: string,
  list: ConfigList,
  declaredSet: ReadonlySet<string>,
  dirExists: (relPath: string) => boolean
): CoverageViolation | undefined {
  if (!dirExists(key))
    return {
      kind: "orphan-directory-missing",
      file: key,
      message: `listed under "${list}" but the directory does not exist — a fossil left by a delete or rename. Remove the entry.`,
    }
  if (!declaredSet.has(key))
    return {
      kind: "orphan-not-declared",
      file: key,
      message: `listed under "${list}" but is not declared in package.json#workspaces. The config is only ever read by declared workspace, so this entry is inert — declare the workspace, or remove the entry.`,
    }
  return undefined
}

export function reconcileCoverage(input: CoverageInput): CoverageResult {
  const { declared, config, dirExists, typescriptFileCount } = input
  const ratchet = input.ratchetSize ?? PENDING_CURATION_SIZE
  const violations: CoverageViolation[] = []

  const declaredSet = new Set(declared)
  const analysedSet = new Set(config.analysed)
  const pendingSet = new Set(config.pendingCuration)

  const counts: Record<WorkspaceClassification, number> = {
    analysed: 0,
    outOfScope: 0,
    pendingCuration: 0,
    unclassified: 0,
    multiplyClassified: 0,
  }

  for (const workspace of declared) {
    const memberships: ConfigList[] = []
    if (analysedSet.has(workspace)) memberships.push("workspaces")
    if (config.outOfScope.has(workspace)) memberships.push("outOfScope")
    if (pendingSet.has(workspace)) memberships.push("pendingCuration")

    const classification = classify(memberships)
    counts[classification]++

    if (classification === "unclassified") {
      violations.push({
        kind: "unclassified",
        file: workspace,
        message: `declared in package.json#workspaces but absent from ast-unused.config.json. Add curated entry/project globs under "workspaces" to analyse it, or record it under "pendingCuration". A workspace that is silently skipped makes exports consumed only by it look unused elsewhere.`,
      })
    } else if (classification === "multiplyClassified") {
      violations.push({
        kind: "multiply-classified",
        file: workspace,
        message: `classified in ${memberships.length} lists at once (${memberships.join(", ")}). Each workspace must resolve to exactly one state.`,
      })
    }
  }

  for (const key of config.analysed) {
    const orphan = orphanViolation(key, "workspaces", declaredSet, dirExists)
    if (orphan !== undefined) violations.push(orphan)
  }

  for (const [key, predicate] of config.outOfScope) {
    const orphan = orphanViolation(key, "outOfScope", declaredSet, dirExists)
    if (orphan !== undefined) {
      violations.push(orphan)
      continue
    }
    if (!predicateHolds(predicate, key, typescriptFileCount)) {
      violations.push({
        kind: "predicate-falsified",
        file: key,
        message: describeFalsifiedPredicate(predicate, key, typescriptFileCount),
      })
    }
  }

  for (const key of config.pendingCuration) {
    const orphan = orphanViolation(key, "pendingCuration", declaredSet, dirExists)
    if (orphan !== undefined) violations.push(orphan)
  }

  if (config.pendingCuration.length !== ratchet) {
    violations.push({
      kind: "ratchet-mismatch",
      message: `pendingCuration holds ${config.pendingCuration.length} entries but PENDING_CURATION_SIZE is ${ratchet}. The two must agree exactly: curating a workspace OUT lowers the number in the same edit, and parking one raises it — each is a deliberate act that has to be visible as its own edit rather than absorbed by headroom. Curate the workspace into "workspaces" instead of parking it.`,
    })
  }

  return { violations, tally: { declared: declared.length, ...counts } }
}
