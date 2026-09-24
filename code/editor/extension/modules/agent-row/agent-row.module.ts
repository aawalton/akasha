import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentRow = {
  id: "01a0686b-bfe9-7005-a82e-21c216ec82ea",
  type: "page-type/module",
  slug: "agent-row",
  definition: "the shape of a row the agent tree draws, and the shape a click on a seat carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is the top row, a seat, or a subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's children are rows of any kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row names the page akasha has for that row or names none at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row naming no page names no page in its tooltip and opens no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent row says whether that subagent was stopped from the panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click has the seat's id and the seat's name and nothing more.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a row.",
    },

    {
      decisionKind: "decision-kind/gap",
      statement: "A row is spelled here as every other tree the editor draws spells a row.",
    },
  ],
} as const satisfies Module
