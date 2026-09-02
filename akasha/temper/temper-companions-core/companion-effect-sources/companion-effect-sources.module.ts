import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionEffectSources = {
  id: "01a06152-c2c7-7dff-b7bf-68a31c3744ce",
  pageTypeSlug: "module",
  slug: "companion-effect-sources",
  definition: "extractors turning a companion build into categorized metric effect sources",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The off-hand weapon damage fraction sits as a bare constant rather than in a table.",
    },
    {
      invariantKind: "constraint",
      statement: "Every source carries a categoryId drawn from the shared SourceCategoryId union.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The class passive contributes a source only when the companion declares a classPassiveId.",
    },
  ],
} as const satisfies Module
