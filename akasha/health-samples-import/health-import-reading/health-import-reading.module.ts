import type { Module } from "../../code-system/modules/module.page-type.ts"

export const healthImportReading = {
  id: "01a05c14-b11a-7005-9108-0d098d5f3aa7",
  pageTypeSlug: "module",
  slug: "health-import-reading",
  definition: "what an import run says about itself once it is done",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run that wrote every record the run read reads as imported.",
    },
    {
      invariantKind: "departure",
      statement: "A run that lost records reads as lossy and names what the run lost.",
    },
    {
      invariantKind: "departure",
      statement: "A run that cannot tell what the run lost reads as unsettled.",
    },
  ],
} as const satisfies Module
