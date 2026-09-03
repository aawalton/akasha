import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const keepDecision = {
  id: "01a06863-74e2-7c1b-b23b-96d87eca0184",
  pageTypeSlug: "module",
  slug: "keep-decision",
  definition: "the shapes a decision about which backups are kept is stated in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A keep marking is nokeep or standalone or full.",
    },
    {
      invariantKind: "departure",
      statement: "A disagreement names one backup or one period holding no backup.",
    },
  ],
} as const satisfies Module
