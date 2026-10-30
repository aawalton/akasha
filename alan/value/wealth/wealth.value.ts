import type { Value } from "akasha/alan/value/value.page-type.types.ts"

export const wealth = {
  id: "019eb7d1-032b-73d1-bb88-07b4625d5fb9",
  type: "page-type/value",
  slug: "wealth",
  definition: "Alan's freedom from the limits of the world",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "wealth" }],
  label: "Wealth",
  description:
    "Wealth represents my ability to exist independent from the constraints of the world, including freedom of time, freedom of attention, freedom of location, and freedom of action.",
  color: "color/orange",
  place: 6,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
  createdAt: "2026-06-11T17:53:08.907Z",
  updatedAt: "2026-10-30T16:47:48.344Z",
} as const satisfies Value
