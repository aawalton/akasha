import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionPointsCompute = {
  id: "01a06972-b75e-7000-8a80-28e0cf97299c",
  pageTypeSlug: "module",
  slug: "session-points-compute",
  definition:
    "session rows summed into a persona's points, over a day's window or over all of them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session row falls on the day Alan's sleep opened rather than on the ESO day.",
    },
    {
      invariantKind: "departure",
      statement: "A day is summed from the moment that day opened to the moment the next one did.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose window refuses is passed over rather than summed as no points.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts a day over the six-in-the-morning ESO boundary.",
    },
  ],
} as const satisfies Module
