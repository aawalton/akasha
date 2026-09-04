import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NoveltyCapPerSession = number

export const noveltyCapPerSession = {
  id: "01a06865-7f45-79c3-90cc-7ae5faa9f60c",
  pageTypeSlug: "number-property",
  slug: "novelty-cap-per-session",
  propertySlug: "novelty-cap-per-session",
  definition: "how many movements new to Alan one session may hold",
  max: null,
} as const satisfies NumberProperty
