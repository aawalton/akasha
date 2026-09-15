import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentNaming = {
  id: "01a06949-b281-7ea1-9435-503a9b97d864",
  type: "page-type/module",
  slug: "subagent-naming",
  definition: "how a subagent's name has the seat above it, joined by a double hyphen",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The mark between the two names is two hyphens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is split at the first mark rather than the last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name opening with the mark names no seat above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name without the mark belongs to a seat rather than a subagent.",
    },
  ],
} as const satisfies Module
