import {
  FUNCTIONAL_TYPES,
  type FunctionalType,
  type ReadFunctionalTypeResult,
} from "../../../../../tools/lib/check-workflow/functional-type.ts"

export interface WorkspaceTypeRead {
  readonly path: string
  readonly result: ReadFunctionalTypeResult
  readonly inferred: FunctionalType | null
  readonly unclassifiable: boolean
}

export interface MissingFunctionalTypeFinding {
  readonly kind: "MissingFunctionalType"
  readonly path: string
}

export interface InvalidFunctionalTypeFinding {
  readonly kind: "InvalidFunctionalType"
  readonly path: string
  readonly raw: string
}

export interface MismatchedFunctionalTypeFinding {
  readonly kind: "MismatchedFunctionalType"
  readonly path: string
  readonly declared: FunctionalType
  readonly inferred: FunctionalType
}

export interface UnclassifiableWorkspaceFinding {
  readonly kind: "UnclassifiableWorkspace"
  readonly path: string
  readonly declared: FunctionalType | null
}

export type Finding =
  | MissingFunctionalTypeFinding
  | InvalidFunctionalTypeFinding
  | MismatchedFunctionalTypeFinding
  | UnclassifiableWorkspaceFinding

export const ACT_BY_KIND: Readonly<Record<Finding["kind"], string>> = {
  MissingFunctionalType:
    "add a top-level `functionalType` to the workspace's package.json, matching what the discriminator chain infers",
  InvalidFunctionalType: `replace the value with one of: ${FUNCTIONAL_TYPES.join(", ")}`,
  MismatchedFunctionalType:
    "change the declared value to the inferred one, or change the workspace's manifest and source so the chain infers what it declares",
  UnclassifiableWorkspace:
    "add a discriminator row for this shape in functional-type-discriminators.ts, or give the workspace a signal an existing row already reads",
}

export function findFunctionalTypeViolations(
  reads: readonly WorkspaceTypeRead[]
): readonly Finding[] {
  const findings: Finding[] = []
  for (const read of reads) {
    if (read.unclassifiable) {
      findings.push({
        kind: "UnclassifiableWorkspace",
        path: read.path,
        declared: read.result.type,
      })
      continue
    }
    if (read.result.type === null) {
      if (read.result.raw === undefined) {
        findings.push({ kind: "MissingFunctionalType", path: read.path })
      } else {
        findings.push({
          kind: "InvalidFunctionalType",
          path: read.path,
          raw: read.result.raw,
        })
      }
      continue
    }
    if (read.inferred !== null && read.inferred !== read.result.type) {
      findings.push({
        kind: "MismatchedFunctionalType",
        path: read.path,
        declared: read.result.type,
        inferred: read.inferred,
      })
    }
  }
  findings.sort((a, b) => {
    if (a.path !== b.path) return a.path < b.path ? -1 : 1
    return a.kind < b.kind ? -1 : a.kind > b.kind ? 1 : 0
  })
  return findings
}
