import type { Page } from "akasha/page/page.page-type.types.ts"
import type { FeatureRequestAsk } from "akasha/product/kofi/feature-request/properties/feature-request-ask.text-property.types.ts"
import type { FeatureRequestBoost } from "akasha/product/kofi/feature-request/properties/feature-request-boost.action-button-property.types.ts"
import type { FeatureRequestBoosts } from "akasha/product/kofi/feature-request/properties/feature-request-boosts.record-property.types.ts"
import type { FeatureRequestProduct } from "akasha/product/kofi/feature-request/properties/feature-request-product.relation-property.types.ts"
import type { FeatureRequestProposer } from "akasha/product/kofi/feature-request/properties/feature-request-proposer.relation-property.types.ts"
import type { FeatureRequestStanding } from "akasha/product/kofi/feature-request/properties/feature-request-standing.select-property.types.ts"

export type FeatureRequest = Page & {
  ask: FeatureRequestAsk
  product: FeatureRequestProduct
  boosts?: FeatureRequestBoosts
  standing: FeatureRequestStanding
  proposer: FeatureRequestProposer
  boost?: FeatureRequestBoost
}
