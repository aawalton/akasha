import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const selectionPolicy = {
  id: "01a0658f-e6c3-7002-9dd2-5d4b7b900bca",
  pageTypeSlug: "module",
  slug: "selection-policy",
  definition: "the weights and bounds exercise selection runs under, and the bodyweight it runs on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page carries the policy.",
    },
    {
      invariantKind: "departure",
      statement: "A second page carrying the policy is refused rather than picked between.",
    },
    {
      invariantKind: "departure",
      statement: "A field the page states no number for is refused rather than defaulted.",
    },
    {
      invariantKind: "departure",
      statement: "The bodyweight is written back to the client profile page.",
    },
  ],
} as const satisfies Module
