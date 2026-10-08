import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanReadout = {
  id: "01a0655b-9cdd-774f-9482-0a29f14e0665",
  type: "page-type/domain",
  slug: "alan-readout",
  definition: "Alan's readouts",
  parts: [
    "module/day-readout-watching",
    "module/workstation-load-sampling",
    "service-workstation/day-readout-watch-service",
    "service-workstation/workstation-load-sampler",
  ],
  createdAt: "2026-09-03T03:41:37.885Z",
  updatedAt: "2026-09-24T22:23:39.000Z",
} as const satisfies Domain
