import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { DenominationName } from "akasha/story/world/mechanics/currencies/properties/denomination-name.text-property.types.ts"
import type { DenominationWorth } from "akasha/story/world/mechanics/currencies/properties/denomination-worth.number-property.types.ts"

export type CurrencyDenominations = List<{
  name: DenominationName
  worth: DenominationWorth
}>
