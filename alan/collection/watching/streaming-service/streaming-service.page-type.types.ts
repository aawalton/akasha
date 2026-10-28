import type { HeldEvidence } from "akasha/alan/collection/watching/streaming-service/properties/held-evidence.text-property.types.ts"
import type { ProviderNames } from "akasha/alan/collection/watching/streaming-service/properties/provider-names.text-property.types.ts"
import type { StreamingFree } from "akasha/alan/collection/watching/streaming-service/properties/streaming-free.boolean-property.types.ts"
import type { StreamingHeld } from "akasha/alan/collection/watching/streaming-service/properties/streaming-held.boolean-property.types.ts"
import type { StreamingMerchant } from "akasha/alan/collection/watching/streaming-service/properties/streaming-merchant.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type StreamingService = Page & {
  title: Title
  providerNames: ProviderNames
  free: StreamingFree
  held: StreamingHeld
  heldEvidence?: HeldEvidence
  merchant?: StreamingMerchant
}
