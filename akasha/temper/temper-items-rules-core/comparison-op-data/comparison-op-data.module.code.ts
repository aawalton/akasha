import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface ComparisonOpTemplate {
  id: string
  name: string
}

export const TEMPER_COMPARISON_OPS = {
  "<=": { id: "<=", name: "≤" },
  "<": { id: "<", name: "<" },
  ">=": { id: ">=", name: "≥" },
  ">": { id: ">", name: ">" },
  "=": { id: "=", name: "=" },
  "!=": { id: "!=", name: "≠" },
} as const satisfies Record<string, ComparisonOpTemplate>

export const comparisonOps = createDataFile<ComparisonOpTemplate>()(TEMPER_COMPARISON_OPS)

export type ComparisonOpId = (typeof comparisonOps.ids)[number]
