import type { CounterpartWithinDays } from "akasha/alan/harness/monarch/category-rules/properties/counterpart-within-days.number-property.types.ts"
import type { Matches } from "akasha/alan/harness/monarch/category-rules/properties/matches.record-property.ts"
import type { RuleNote } from "akasha/alan/harness/monarch/category-rules/properties/rule-note.text-property.types.ts"
import type { TransactionCategory } from "akasha/alan/harness/monarch/months/properties/transaction-category.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type CategoryRule = Page & {
  title: Title
  matches: Matches
  category?: TransactionCategory
  ruleNote?: RuleNote
  counterpartWithinDays?: CounterpartWithinDays
}
