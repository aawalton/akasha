import type { MatchComparison } from "akasha/alan/harness/monarch/category-rule/properties/match-comparison.select-property.types.ts"
import type { MatchKey } from "akasha/alan/harness/monarch/category-rule/properties/match-key.select-property.types.ts"
import type { MatchValues } from "akasha/alan/harness/monarch/category-rule/properties/match-values.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Matches = List<{
  key: MatchKey
  comparison: MatchComparison
  values: MatchValues
}>
