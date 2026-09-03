import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreeLookup = {
  id: "01a0686b-bfe9-784a-84aa-10a105843c4e",
  pageTypeSlug: "module",
  slug: "agent-tree-lookup",
  definition: "the place each seat holds, and what a drawn forest answers about a row in it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row naming no place a seat mode admits is read as interactive.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is found by name at whatever depth it sits.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is never found by name.",
    },
    {
      invariantKind: "departure",
      statement: "Two seats of one name leave the deepest one found.",
    },
    {
      invariantKind: "departure",
      statement: "An ancestor trail runs from the row's parent outward to the root.",
    },
    {
      invariantKind: "departure",
      statement: "A row no root reaches has an empty trail.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes a row.",
    },
  ],
} as const satisfies Module
