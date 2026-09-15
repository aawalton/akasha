import type { MerchantPatterns } from "akasha/alan/harness/monarch/merchant/properties/merchant-patterns.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type MonarchMerchant = Page & {
  title: Title
  merchantPatterns: MerchantPatterns
}
