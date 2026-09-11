import type { maturityRating } from "akasha/alan/library/reading/book-series/properties/maturity-rating.select-property.ts"

export type MaturityRating = (typeof maturityRating.values)[number]
