import type { Module } from "../../code-system/module/module.page-type.ts"

export const stoplightReading = {
  id: "01a05c9d-4096-7300-82a3-7fdc3ef1d9f4",
  pageTypeSlug: "module",
  slug: "stoplight-reading",
  definition: "the stoplights a day draws in each of the groups it is read in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group is named by the entry point rather than by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "Each entry point asks through a binding of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds a stoplight between calls.",
    },
  ],
} as const satisfies Module
