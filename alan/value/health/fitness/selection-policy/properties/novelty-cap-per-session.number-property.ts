import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const noveltyCapPerSession = {
  id: "01a06865-7f45-79c3-90cc-7ae5faa9f60c",
  type: "page-type/number-property",
  slug: "novelty-cap-per-session",
  propertySlug: "novelty-cap-per-session",
  definition: "how many movements new to Alan a session may hold",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
