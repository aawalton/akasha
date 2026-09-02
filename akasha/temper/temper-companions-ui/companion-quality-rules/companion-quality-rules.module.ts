import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionQualityRules = {
  id: "01a06360-7480-7004-99b9-59ca52965b19",
  pageTypeSlug: "module",
  slug: "companion-quality-rules",
  definition: "the variant and text class a companion equipment quality is drawn in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quality that is no quality is drawn muted and carries no text class.",
    },
  ],
} as const satisfies Module
