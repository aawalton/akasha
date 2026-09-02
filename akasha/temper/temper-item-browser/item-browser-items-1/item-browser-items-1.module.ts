import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserItems1 = {
  id: "01a06178-371e-7a90-9ee3-643e246e6a36",
  pageTypeSlug: "module",
  slug: "item-browser-items-1",
  definition: "the first third of the item set rows, in the order upstream wrote them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "These rows are a frozen port of an upstream table.",
    },
    {
      invariantKind: "gap",
      statement: "No program in this repository rebuilds these rows.",
    },
  ],
} as const satisfies Module
