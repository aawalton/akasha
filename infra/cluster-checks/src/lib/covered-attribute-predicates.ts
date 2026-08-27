import type { SnapshotAttributeIndex } from "./snapshot-attribute-indexes"
import { indexCoversKey } from "./snapshot-attribute-indexes"

interface CoveredBase {
  readonly file: string
  readonly table: string
  readonly key: string
}
export type CoveredAttributePredicate =
  | (CoveredBase & { readonly kind: "indexed"; readonly coveringIndex: string })
  | (CoveredBase & { readonly kind: "accepted"; readonly reason: string })

export interface CoverageViolation {
  readonly kind: "missing-index" | "blank-reason" | "unregistered-key"
  readonly file: string
  readonly key: string
  readonly detail: string
}

export const COVERED_ATTRIBUTE_PREDICATES: readonly CoveredAttributePredicate[] = [
  {
    file: "packages/shared/pages/access/src/filters-where.ts",
    table: "pages",
    key: "owner",
    kind: "accepted",
    reason:
      "the covering index was pages_project_owner_status_completed_at_idx, partial on page_type_slug = 'project', and it went with the project rows themselves: projects are file-backed and the table holds none. This file names no key of its own — it lowers whatever key a caller passes to attributes->>'<key>' — so the registration is about the owner predicate rather than about this file. Of the page types still carrying an owner attribute, only view does, on 95 live rows measured, which no index on the hot pages table earns.",
  },
]

export const CARVE_OUT_FILES: ReadonlySet<string> = new Set(
  COVERED_ATTRIBUTE_PREDICATES.map((e) => e.file)
)

export function verifyRegistryAgainstSnapshot(
  registry: readonly CoveredAttributePredicate[],
  indexes: readonly SnapshotAttributeIndex[]
): readonly CoverageViolation[] {
  const out: CoverageViolation[] = []
  for (const e of registry) {
    if (e.kind === "indexed") {
      if (!indexCoversKey(indexes, { indexName: e.coveringIndex, table: e.table, key: e.key })) {
        out.push({
          kind: "missing-index",
          file: e.file,
          key: e.key,
          detail: `claims coverage by '${e.coveringIndex}' for ${e.table}.attributes->>'${e.key}', but no such index over that key exists in the committed snapshot`,
        })
      }
    } else if (e.reason.trim() === "") {
      out.push({
        kind: "blank-reason",
        file: e.file,
        key: e.key,
        detail: `accepted (un-indexed) predicate on ${e.table}.attributes->>'${e.key}' must carry a non-empty reason`,
      })
    }
  }
  return out
}

export function verifyFilePredicatesRegistered(
  file: string,
  scannedKeys: readonly string[],
  registry: readonly CoveredAttributePredicate[]
): readonly CoverageViolation[] {
  const registeredKeys = new Set(registry.filter((e) => e.file === file).map((e) => e.key))
  const out: CoverageViolation[] = []
  for (const key of scannedKeys) {
    if (!registeredKeys.has(key)) {
      out.push({
        kind: "unregistered-key",
        file,
        key,
        detail: `predicate on attributes->>'${key}' has no entry in COVERED_ATTRIBUTE_PREDICATES — rewrite to '@>' containment or register it with an index/accept decision`,
      })
    }
  }
  return out
}
