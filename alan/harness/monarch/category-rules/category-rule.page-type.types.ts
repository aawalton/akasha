import type { Page } from "../../../../pages/page.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { TransactionCategory } from "../months/properties/transaction-category.relation-property.ts"
import type { CounterpartWithinDays } from "./properties/counterpart-within-days.number-property.ts"
import type { Matches } from "./properties/matches.record-property.ts"
import type { RuleNote } from "./properties/rule-note.text-property.ts"

export type CategoryRule = Page & {
  title: Title
  matches: Matches
  category?: TransactionCategory
  ruleNote?: RuleNote
  counterpartWithinDays?: CounterpartWithinDays
}
