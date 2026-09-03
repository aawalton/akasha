import type { Module } from "@akasha/code-system/module"

export const agentTurnState = {
  id: "01a0695a-d2ea-7bab-afe4-27cd562f970b",
  pageTypeSlug: "module",
  slug: "agent-turn-state",
  definition:
    "an agent's turn state read as a seat's or a subagent's, by whether a seat is above it",
  code: "ts",
} as const satisfies Module
