import type { Page } from "../../pages/page.page-type.types.ts"
import type { KeptSenses } from "./properties/kept-senses.text-property.ts"
import type { Pattern } from "./properties/pattern.text-property.ts"
import type { TabooSenses } from "./properties/taboo-senses.record-property.ts"

export type TabooTerm = Page & {
  pattern: Pattern
  tabooSenses: TabooSenses
  keptSenses?: KeptSenses
}
