import type { SelectProperty } from "@akasha/pages/select-property"

export const difficulty = {
  id: "01a065a1-49b7-7183-85e6-153e155199f3",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "difficulty",
  propertySlug: "difficulty",
  definition: "how much doing it takes out of Alan",
  values: ["trivial", "light", "hard", "major"],
} as const satisfies SelectProperty

export type Difficulty = (typeof difficulty.values)[number]
