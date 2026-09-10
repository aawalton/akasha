import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Collection } from "../locations/properties/collection.relation-property.ts"
import type { DealKey } from "./properties/deal-key.text-property.ts"
import type { FinePrint } from "./properties/fine-print.text-property.ts"
import type { Locations } from "./properties/locations.relation-property.ts"
import type { OfferText } from "./properties/offer-text.text-property.ts"
import type { OfferType } from "./properties/offer-type.text-property.ts"
import type { RedemptionCode } from "./properties/redemption-code.text-property.ts"
import type { Section } from "./properties/section.text-property.ts"
import type { StruckOut } from "./properties/struck-out.boolean-property.ts"
import type { UseLimit } from "./properties/use-limit.select-property.ts"
import type { UsesUsed } from "./properties/uses-used.number-property.ts"

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
