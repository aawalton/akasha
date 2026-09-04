import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreeState = {
  id: "01a0686b-bfe9-705b-a5cc-ec57c2a1d63b",
  pageTypeSlug: "module",
  slug: "agent-tree-state",
  definition:
    "the output channel, forest, column memory, seat terminals and seat tabs one panel holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each of the five is replaced whole rather than changed in place.",
    },
    {
      invariantKind: "departure",
      statement: "A forest and a set of seat tabs stand empty until the first read replaces them.",
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
      statement: "The state is held here rather than passed between the pieces that share it.",
    },
  ],
} as const satisfies Module
