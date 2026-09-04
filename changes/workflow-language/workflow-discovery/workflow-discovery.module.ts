import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const workflowDiscovery = {
  id: "01a069cc-a5df-7194-9ce1-482240537dc8",
  pageTypeSlug: "module",
  slug: "workflow-discovery",
  definition: "the workflows a tree declares, read off its workflow-template pages and loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow takes its kind from its page rather than from its declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A page's file is found by that page's id in the tree's index.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration is the file standing beside its page's own file.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration stated as a function is called with the code root of the run.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose declaration exports no workflow is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration is loaded again on each call rather than held from an earlier one.",
    },
  ],
} as const satisfies Module
