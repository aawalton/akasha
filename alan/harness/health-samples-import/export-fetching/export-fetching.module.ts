import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exportFetching = {
  id: "01a05c14-b11a-7000-a275-a3e0c5949f69",
  pageTypeSlug: "module",
  type: "module",
  slug: "export-fetching",
  definition: "an export read off this workstation or off the laptop, and parsed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This workstation is looked in before the laptop is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A workstation with no export falls through to the laptop.",
    },
    {
      invariantKind: "departure",
      statement: "One script reads either machine.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is kept on disk between the fetch and the parse.",
    },
  ],
} as const satisfies Module
