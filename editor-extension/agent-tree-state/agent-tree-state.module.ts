import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreeState = {
  id: "01a0686b-bfe9-705b-a5cc-ec57c2a1d63b",
  pageTypeSlug: "module",
  type: "module",
  slug: "agent-tree-state",
  definition:
    "the output channel, forest, column memory, seat terminals and seat tabs one panel has",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every piece the panel has is replaced whole rather than changed in place.",
    },
    {
      invariantKind: "departure",
      statement:
        "A forest and a set of seat tabs are empty until the first read replaces that forest and that set.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws anything.",
    },
    {
      invariantKind: "gap",
      statement:
        "The state is held here rather than passed between the pieces that share that state.",
    },
  ],
} as const satisfies Module
