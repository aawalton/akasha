import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const difficulty = {
  id: "01a065a1-49b7-7183-85e6-153e155199f3",
  type: "page-type/select-property",
  slug: "difficulty",
  propertySlug: "difficulty",
  definition: "how much doing it takes out of Alan",
  values: ["trivial", "light", "hard", "major"],
  types: "ts",
  createdAt: "2026-09-03T04:57:44.119Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
