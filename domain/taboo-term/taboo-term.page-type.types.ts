import type { KeptSenses } from "akasha/domain/taboo-term/properties/kept-senses.text-property.types.ts"
import type { Pattern } from "akasha/domain/taboo-term/properties/pattern.text-property.types.ts"
import type { TabooSenses } from "akasha/domain/taboo-term/properties/taboo-senses.record-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type TabooTerm = Page & {
  pattern: Pattern
  tabooSenses: TabooSenses
  keptSenses?: KeptSenses
}
