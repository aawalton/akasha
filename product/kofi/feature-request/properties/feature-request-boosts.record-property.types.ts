import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ContributionPoints } from "akasha/product/kofi/contributor/properties/contribution-points.number-property.types.ts"
import type { FeatureRequestBooster } from "akasha/product/kofi/feature-request/properties/feature-request-booster.relation-property.types.ts"

export type FeatureRequestBoosts = List<{
  contributor: FeatureRequestBooster
  points: ContributionPoints
}>
