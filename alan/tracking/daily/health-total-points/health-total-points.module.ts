import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const healthTotalPoints = {
  id: "01a06972-b9ac-7000-9acd-7dec5960ac52",
  pageTypeSlug: "module",
  slug: "health-total-points",
  definition: "each health persona's cumulative total, summed from her days and landed on her page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The persona days are asked of the checkout this code runs in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the pages system service.",
    },
    {
      invariantKind: "departure",
      statement: "A key goes out camel and comes back kebab.",
    },
    {
      invariantKind: "absence",
      statement: "No count is compared against itself in place of the short-read guard that went.",
    },
  ],
} as const satisfies Module
