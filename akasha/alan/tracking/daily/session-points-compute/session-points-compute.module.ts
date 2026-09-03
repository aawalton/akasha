import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionPointsCompute = {
  id: "01a06972-b75e-7000-8a80-28e0cf97299c",
  pageTypeSlug: "module",
  slug: "session-points-compute",
  definition:
    "session rows summed into a persona's points, over a day's window or over all of them",
  code: "ts",
} as const satisfies Module
