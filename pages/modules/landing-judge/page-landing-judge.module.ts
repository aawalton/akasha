import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pageLandingJudge = {
  id: "01a0686e-6807-7002-99df-198a80301ced",
  type: "module",
  slug: "page-landing-judge",
  definition: "the acts that land on a page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The landing acts are the eight acts named here.",
    },
    {
      invariantKind: "departure",
      statement: "An act named nowhere here is no landing act.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands anything.",
    },
  ],
} as const satisfies Module
