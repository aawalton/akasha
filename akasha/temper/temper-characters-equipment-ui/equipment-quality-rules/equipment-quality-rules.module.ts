import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const equipmentQualityRules = {
  id: "01a06333-1bcc-79b7-bb9c-18d82e7b134a",
  pageTypeSlug: "module",
  slug: "equipment-quality-rules",
  definition: "one equipment quality as a reader picks it and reads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quality a reader cannot pick is not offered.",
    },
    {
      invariantKind: "absence",
      statement: "The absence of a quality is shown muted rather than as a quality.",
    },
  ],
} as const satisfies Module
