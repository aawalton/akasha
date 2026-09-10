import type { Page } from "../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { MerchantPatterns } from "./properties/merchant-patterns.text-property.ts"

export type MonarchMerchant = Page & {
  title: Title
  merchantPatterns: MerchantPatterns
}
