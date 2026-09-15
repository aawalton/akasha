import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanReadouts = {
  id: "01a0655b-9cdd-774f-9482-0a29f14e0665",
  type: "domain",
  slug: "alan-readouts",
  definition: "the readouts whose readings reach Alan",
  parts: [
    "module/day-readout-watching",
    "module/workstation-load-sampling",
    "service-workstation/day-readout-watch-service",
    "service-workstation/workstation-load-sampler",
  ],
} as const satisfies Domain
