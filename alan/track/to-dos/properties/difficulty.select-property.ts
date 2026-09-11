import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const difficulty = {
  id: "01a065a1-49b7-7183-85e6-153e155199f3",
  type: "select-property",
  slug: "difficulty",
  propertySlug: "difficulty",
  definition: "how much doing it takes out of Alan",
  values: ["trivial", "light", "hard", "major"],
  types: "ts",
} as const satisfies SelectProperty
