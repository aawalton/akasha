import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const wisdomPoints = {
  id: "01a0ca45-cdbb-7074-8627-3417aac32419",
  type: "page-type/readout-scale",
  slug: "wisdom-points",
  definition: "the wisdom points earned against a day's target",
  blackAt: 0,
  redAt: 0.125,
  yellowAt: 0.25,
  greenAt: 0.5,
  blueAt: 1,
} as const satisfies ReadoutScale
