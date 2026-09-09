import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const taskPoints = {
  id: "01a06972-bc60-7000-8177-563b1f4bc872",
  pageTypeSlug: "module",
  slug: "task-points",
  definition: "one day's health task points, worked out and landed on the day",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day answering no points lands nothing rather than landing zero on the day.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day that landed nothing answers uncounted where a day landing points answers how.",
    },
  ],
} as const satisfies Module
