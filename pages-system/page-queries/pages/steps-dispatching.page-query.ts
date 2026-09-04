import type { PageQuery } from "../page-query.page-type.ts"

export const stepsDispatching = {
  id: "01a063f9-220c-7aa5-9761-f48e7f9ae96a",
  pageTypeSlug: "page-query",
  slug: "steps-dispatching",
  asksOfSlug: "step",
  narrows: [{ key: "status", comparison: "in", values: ["dispatching"] }],
} as const satisfies PageQuery
