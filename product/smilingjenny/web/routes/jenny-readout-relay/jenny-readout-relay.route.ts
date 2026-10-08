import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyReadoutRelay = {
  id: "01a08261-664d-7748-87f5-cd5eb99a82a3",
  type: "page-type/route",
  slug: "jenny-readout-relay",
  definition: "the reading a workstation carries into Jenny's site",
  code: "ts",
  urlPath: "api/readout-relay",
  createdAt: "2026-09-08T18:56:56.397Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
