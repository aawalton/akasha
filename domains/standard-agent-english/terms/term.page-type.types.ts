import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { Spelling } from "akasha/domains/standard-agent-english/terms/properties/spelling.text-property.ts"
import type { Variants } from "akasha/domains/standard-agent-english/terms/properties/variants.text-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Term = Page & {
  spelling: Spelling
  variants?: Variants
  definition: Definition
}
