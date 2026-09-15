import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const surplusHours = {
  id: "01a05fc3-145a-7dca-83d9-5316786fa83c",
  type: "page-type/readout-scale",
  slug: "surplus-hours",
  definition: "how much of a night a day has left, counted in hours",
  blackAt: -12,
  redAt: -8,
  yellowAt: -4,
  greenAt: 0,
  blueAt: 4,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs of this scale run below zero as well as above zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading below zero reaches a rung rather than being read as though the scale began at zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day that has eaten into the night is read against this scale rather than another.",
    },
  ],
} as const satisfies ReadoutScale
