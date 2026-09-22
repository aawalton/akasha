import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const copFetch = {
  id: "01a0685d-4b35-700d-9c90-fb07ff5e3a7d",
  type: "page-type/module",
  slug: "cop-fetch",
  definition: "the request settings of a call through the traffic cop",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The request has a deadline of its own rather than the runtime's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The runtime's own idle timeout is turned off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slow cold model load is waited out.",
    },
  ],
} as const satisfies Module
