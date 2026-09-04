import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchFiles = {
  id: "01a0685f-4ed9-7c80-a890-3fdd317a74d0",
  pageTypeSlug: "module",
  slug: "monarch-files",
  definition: "the Monarch pages inside akasha, read from the checkout rather than from a service",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every Monarch page family stands under one folder inside akasha.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checkout is read directly, because the categorization ring runs under a workstation timer where no service stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A month page stands in a folder of its own with its transactions entry file beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A month is named for the year and month a day falls in.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose file states no slug is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no title is titled by its slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction line is read by the entry shape's own camel keys rather than by property slug.",
    },
    {
      invariantKind: "departure",
      statement: "A month with no entry file holds no transactions rather than failing.",
    },
    {
      invariantKind: "departure",
      statement: "A sidecar line that is not one JSON object is refused by its line number.",
    },
    {
      invariantKind: "departure",
      statement: "Transactions read over a span are sorted by day rather than left in month order.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
