import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentPagesSweeping = {
  id: "01a0c9f3-a507-7c30-b53a-684fdfea1f49",
  type: "page-type/module",
  slug: "subagent-pages-sweeping",
  definition: "a sweep of the subagent pages under a seat, asked for and not waited on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep is asked for by an agent id and the seat that id names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id no seat is named for asks for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep runs against akasha rather than against the checkout the caller has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller does not wait for the sweep it asked for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says whether the sweep took anything.",
    },
  ],
} as const satisfies Module
