import type { Value } from "../value.page-type.ts"

export const fun = {
  id: "019eb7d1-01be-7a20-b8e8-05008697aea9",
  pageTypeSlug: "value",
  slug: "fun",
  definition: "the games, stories and arts Alan plays, takes in and makes",
  label: "Fun",
  description:
    "Fun represents my time spent being creative and playful, doing things because they are interesting and not for any higher instrumental purpose.",
  colorSlug: "yellow",
  place: 5,
  unit: "green day units",
  scaleSlug: "readout-scale/green-day-units",
  groupSlugs: ["readout-group/values"],
  querySlug: "value-green-day-units-on-day",
  queryArgument: "value",
  queryKey: "fun",
  totalPoints: 6533.94563,
} as const satisfies Value
