import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentTreeLookup = {
  id: "01a0686b-bfe9-784a-84aa-10a105843c4e",
  type: "module",
  slug: "agent-tree-lookup",
  definition: "the place each seat has, and what a drawn forest answers about a row in it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row naming no place a seat mode admits is read as interactive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is found by name at whatever depth that seat sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent is never found by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two seats of one name leave the deepest seat found.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ancestor trail runs from the row's parent outward to the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row no root reaches has an empty trail.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here composes a row.",
    },
  ],
} as const satisfies Module
