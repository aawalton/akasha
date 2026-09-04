import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const movementRecency = {
  id: "01a0685e-89d5-7411-b3f4-d865d9c9ce9d",
  pageTypeSlug: "module",
  slug: "movement-recency",
  definition: "how much a movement gains for having been left alone since it was last performed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement never performed gains nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A movement performed today gains nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The gain rises with the days since and stops at the saturation day.",
    },
    {
      invariantKind: "departure",
      statement: "A saturation of no days turns the gain off.",
    },
    {
      invariantKind: "departure",
      statement: "The gain is added to the blend rather than folded into it.",
    },
  ],
} as const satisfies Module
