import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentRow = {
  id: "01a0686b-bfe9-7005-a82e-21c216ec82ea",
  pageTypeSlug: "module",
  slug: "agent-row",
  definition: "the shape of a row the agent tree draws, and the shape a click on a seat carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is a seat or a subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A row's children are rows of either kind.",
    },
    {
      invariantKind: "departure",
      statement: "A row names the page akasha holds for it or names none at all.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming no page names none in its tooltip and opens none.",
    },
    {
      invariantKind: "departure",
      statement: "A click carries the seat's id and the seat's name and nothing more.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a row.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
    {
      invariantKind: "gap",
      statement: "The shape stands apart from its composer so either can land first.",
    },
  ],
} as const satisfies Module
