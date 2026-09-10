import type { maturityRating } from "./maturity-rating.select-property.ts"

export type MaturityRating = (typeof maturityRating.values)[number]
