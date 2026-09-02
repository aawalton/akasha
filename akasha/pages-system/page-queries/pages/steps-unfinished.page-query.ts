import type { PageQuery } from "../page-query.page-type.ts"

export const stepsUnfinished = {
  id: "01a063f9-220c-7a68-a993-fec0d2a1a9c3",
  pageTypeSlug: "page-query",
  slug: "steps-unfinished",
  asksOfSlug: "step",
  narrows: [
    { key: "status", comparison: "in", values: ["pending", "dispatching", "launching", "running"] },
  ],
} as const satisfies PageQuery
