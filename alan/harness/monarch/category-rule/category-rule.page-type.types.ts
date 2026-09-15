import type { CounterpartWithinDays } from "akasha/alan/harness/monarch/category-rule/properties/counterpart-within-days.number-property.types.ts"
import type { Matches } from "akasha/alan/harness/monarch/category-rule/properties/matches.record-property.types.ts"
import type { RuleNote } from "akasha/alan/harness/monarch/category-rule/properties/rule-note.text-property.types.ts"
import type { TransactionCategory } from "akasha/alan/harness/monarch/category-rule/properties/transaction-category.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type CategoryRule = Page & {
  title: Title
  matches: Matches
  category?: TransactionCategory
  ruleNote?: RuleNote
  counterpartWithinDays?: CounterpartWithinDays
}
