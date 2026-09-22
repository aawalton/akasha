import type { Collection } from "akasha/alan/collection/place/location/properties/collection.relation-property.types.ts"
import type { DealKey } from "akasha/alan/collection/place/location-deal/properties/deal-key.text-property.types.ts"
import type { FinePrint } from "akasha/alan/collection/place/location-deal/properties/fine-print.text-property.types.ts"
import type { Locations } from "akasha/alan/collection/place/location-deal/properties/locations.multi-relation-property.types.ts"
import type { OfferText } from "akasha/alan/collection/place/location-deal/properties/offer-text.text-property.types.ts"
import type { OfferType } from "akasha/alan/collection/place/location-deal/properties/offer-type.text-property.types.ts"
import type { RedemptionCode } from "akasha/alan/collection/place/location-deal/properties/redemption-code.text-property.types.ts"
import type { Section } from "akasha/alan/collection/place/location-deal/properties/section.text-property.types.ts"
import type { StruckOut } from "akasha/alan/collection/place/location-deal/properties/struck-out.boolean-property.types.ts"
import type { UseLimit } from "akasha/alan/collection/place/location-deal/properties/use-limit.select-property.types.ts"
import type { UsesUsed } from "akasha/alan/collection/place/location-deal/properties/uses-used.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

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
