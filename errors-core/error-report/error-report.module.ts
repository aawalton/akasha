import type { Module } from "../../code-system/modules/module.page-type.ts"

export const errorReport = {
  id: "01a05c48-deeb-7014-9896-b95f9f374200",
  pageTypeSlug: "module",
  slug: "error-report",
  definition: "the shape a browser's account of one error must have to be taken",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A report naming a key the shape does not hold is refused whole.",
    },
    {
      invariantKind: "departure",
      statement: "Every app that may report is named here.",
    },
  ],
} as const satisfies Module
