import type { Route } from "@akasha/code/route"

export const jennyReadoutRelay = {
  id: "01a08261-664d-7748-87f5-cd5eb99a82a3",
  pageTypeSlug: "route",
  type: "route",
  slug: "jenny-readout-relay",
  definition: "the reading a workstation carries into Jenny's site",
  code: "ts",
  urlPath: "api/readout-relay",
} as const satisfies Route
