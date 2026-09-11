import type { MatchComparison } from "akasha/alan/harness/monarch/category-rules/properties/match-comparison.select-property.types.ts"
import type { MatchKey } from "akasha/alan/harness/monarch/category-rules/properties/match-key.select-property.types.ts"
import type { MatchValues } from "akasha/alan/harness/monarch/category-rules/properties/match-values.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Matches = List<{
  key: MatchKey
  comparison: MatchComparison
  values: MatchValues
}>
