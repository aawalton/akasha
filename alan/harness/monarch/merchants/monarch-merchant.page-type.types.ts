import type { MerchantPatterns } from "akasha/alan/harness/monarch/merchants/properties/merchant-patterns.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type MonarchMerchant = Page & {
  title: Title
  merchantPatterns: MerchantPatterns
}
