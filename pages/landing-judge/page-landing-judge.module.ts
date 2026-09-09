import type { Module } from "@akasha/code/module"

export const pageLandingJudge = {
  id: "01a0686e-6807-7002-99df-198a80301ced",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-landing-judge",
  definition: "which of the acts that land on a page land on a row of it",
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
      invariantKind: "departure",
      statement: "Three named acts land on a row rather than on the page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands anything.",
    },
  ],
} as const satisfies Module
