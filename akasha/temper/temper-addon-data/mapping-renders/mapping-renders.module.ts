import type { Module } from "@akasha/code-system/module"

export const mappingRenders = {
  id: "01a0634a-8c28-7cbe-8c05-edd53469099f",
  pageTypeSlug: "module",
  slug: "mapping-renders",
  definition: "each mapping table there is, beside what renders it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mapping table is named here by the file the table renders as.",
    },
    {
      invariantKind: "departure",
      statement: "Where a rendered table lands is named by `addon-data-target` rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A destination that dies takes no render away.",
    },
  ],
} as const satisfies Module
