import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentTreeState = {
  id: "01a0686b-bfe9-705b-a5cc-ec57c2a1d63b",
  type: "page-type/module",
  slug: "agent-tree-state",
  definition:
    "the output channel, forest, column memory, seat terminals and seat tabs the agents panel keeps",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every piece the panel has is replaced whole rather than changed in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A forest and a set of seat tabs are empty until the first read replaces that forest and that set.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads anything.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The work panel reads the forest kept here rather than reading the fleet itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The state is held here rather than passed between the pieces that share that state.",
    },
  ],
} as const satisfies Module
