import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proxy = {
  id: "01a06863-8e7c-79d7-b834-766a91baff9f",
  type: "module",
  slug: "proxy",
  definition: "a request sent on to its target, the caller named on it or not",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request sent on for a known caller has that caller's name in its headers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A redirect from the target is handed back rather than followed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is passed on still compressed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No websocket target is sent on from here.",
    },
  ],
} as const satisfies Module
