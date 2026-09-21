import type { Page } from "akasha/page/page.page-type.types.ts"
import type { FeatureRequestAsk } from "akasha/product/kofi/feature-request/properties/feature-request-ask.text-property.types.ts"

export type FeatureRequest = Page & {
  ask: FeatureRequestAsk
}
