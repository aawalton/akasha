import type { PurseCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/properties/purse-currency.relation-property.types.ts"
import type { MetricCharacter } from "akasha/story/world/mechanics/metrics/metric-character/metric-character.page-type.types.ts"

export type MetricCharacterCurrency = MetricCharacter & {
  currency: PurseCurrency
}
