import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { CurrencyDenominations } from "akasha/story/world/mechanics/currencies/properties/currency-denominations.record-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldCurrency = WorldMechanic & {
  title: Title
  denominations?: CurrencyDenominations
}
