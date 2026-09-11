import type { KeptSenses } from "akasha/domains/taboo-terms/properties/kept-senses.text-property.ts"
import type { Pattern } from "akasha/domains/taboo-terms/properties/pattern.text-property.ts"
import type { TabooSenses } from "akasha/domains/taboo-terms/properties/taboo-senses.record-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type TabooTerm = Page & {
  pattern: Pattern
  tabooSenses: TabooSenses
  keptSenses?: KeptSenses
}
