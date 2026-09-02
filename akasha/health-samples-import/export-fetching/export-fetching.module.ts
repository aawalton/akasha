import type { Module } from "../../code-system/modules/module.page-type.ts"

export const exportFetching = {
  id: "01a05c14-b11a-7000-a275-a3e0c5949f69",
  pageTypeSlug: "module",
  slug: "export-fetching",
  definition: "an export fetched off the laptop and parsed",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing is kept on disk between the fetch and the parse.",
    },
  ],
} as const satisfies Module
