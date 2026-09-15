import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageLandingJudge = {
  id: "01a0686e-6807-7002-99df-198a80301ced",
  type: "module",
  slug: "page-landing-judge",
  definition: "the acts that land on a page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing acts are the eight acts named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act named nowhere here is no landing act.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands anything.",
    },
  ],
} as const satisfies Module
