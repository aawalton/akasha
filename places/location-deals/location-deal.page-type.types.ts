import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { DealKey } from "akasha/places/location-deals/properties/deal-key.text-property.types.ts"
import type { FinePrint } from "akasha/places/location-deals/properties/fine-print.text-property.types.ts"
import type { Locations } from "akasha/places/location-deals/properties/locations.relation-property.types.ts"
import type { OfferText } from "akasha/places/location-deals/properties/offer-text.text-property.types.ts"
import type { OfferType } from "akasha/places/location-deals/properties/offer-type.text-property.types.ts"
import type { RedemptionCode } from "akasha/places/location-deals/properties/redemption-code.text-property.types.ts"
import type { Section } from "akasha/places/location-deals/properties/section.text-property.types.ts"
import type { StruckOut } from "akasha/places/location-deals/properties/struck-out.boolean-property.types.ts"
import type { UseLimit } from "akasha/places/location-deals/properties/use-limit.select-property.types.ts"
import type { UsesUsed } from "akasha/places/location-deals/properties/uses-used.number-property.types.ts"
import type { Collection } from "akasha/places/locations/properties/collection.relation-property.types.ts"

export type LocationDeal = Page & {
  title: Title
  collection: Collection
  dealKey: DealKey
  finePrint?: FinePrint
  locations: Locations
  offerText: OfferText
  offerType: OfferType
  redemptionCode?: RedemptionCode
  section: Section
  struckOut: StruckOut
  useLimit: UseLimit
  usesUsed: UsesUsed
}
