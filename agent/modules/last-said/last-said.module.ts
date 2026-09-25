import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lastSaid = {
  id: "01a090d4-50b9-79cc-b9d3-8a5af408eacc",
  type: "page-type/module",
  slug: "last-said",
  definition: "the last words of the person and the agent in a transcript",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a tool carried is no part of what the agent wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the person's own prompt made is the only line read as the person's words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the person wrote is read past every word the agent wrote after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a subagent wrote is no part of what the agent wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tail opening partway through a line is read from the next whole line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the agent closed with a tool call and no words answers nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a transcript.",
    },
  ],
} as const satisfies Module
