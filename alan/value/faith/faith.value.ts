import type { Value } from "akasha/alan/value/value.page-type.types.ts"

export const faith = {
  id: "019eb7d0-f2ce-7404-ac55-828a43bc73cf",
  type: "page-type/value",
  slug: "faith",
  definition: "Alan becoming who he is",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "faith" }],
  label: "Faith",
  description:
    "Faith represents my developing understanding of myself and my alignment with the identities I have chosen.",
  color: "color/purple",
  place: 1,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
  createdAt: "2026-06-11T17:53:04.718Z",
  updatedAt: "2026-10-30T16:38:59.628Z",
} as const satisfies Value
