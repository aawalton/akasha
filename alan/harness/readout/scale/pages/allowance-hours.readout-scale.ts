import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const allowanceHours = {
  id: "01a063bd-a526-751e-97d3-d164d0908a7f",
  type: "page-type/readout-scale",
  slug: "allowance-hours",
  definition: "the hours until the limit on a model account resets",
  redAt: 0,
  yellowAt: 24,
  greenAt: 48,
  blueAt: 72,
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T16:16:01.442Z",
} as const satisfies ReadoutScale
