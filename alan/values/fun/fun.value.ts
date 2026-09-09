import type { Value } from "../value.page-type.ts"

export const fun = {
  id: "019eb7d1-01be-7a20-b8e8-05008697aea9",
  pageTypeSlug: "value",
  type: "value",
  slug: "fun",
  definition: "the games, stories and arts Alan plays, takes in and makes",
  label: "Fun",
  description:
    "Fun represents my time spent being creative and playful, doing things because they are interesting and not for any higher instrumental purpose.",
  color: "yellow",
  place: 5,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
} as const satisfies Value
