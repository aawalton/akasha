import type { Module } from "@akasha/code-system/module"

export const pageLandingJudge = {
  id: "01a0686e-6807-7002-99df-198a80301ced",
  pageTypeSlug: "module",
  slug: "page-landing-judge",
  definition: "which of the acts that land on a page land on a row of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing act is one of eight named acts and no other.",
    },
    {
      invariantKind: "departure",
      statement: "Three of those acts land on a row rather than on the page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands anything.",
    },
  ],
} as const satisfies Module
