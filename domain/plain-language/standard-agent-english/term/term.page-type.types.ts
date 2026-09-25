import type { Spelling } from "akasha/domain/plain-language/standard-agent-english/term/properties/spelling.text-property.types.ts"
import type { Spellings } from "akasha/domain/plain-language/standard-agent-english/term/properties/spellings.record-property.types.ts"
import type { Variants } from "akasha/domain/plain-language/standard-agent-english/term/properties/variants.text-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Term = Page & {
  spelling?: Spelling
  variants?: Variants
  definition?: Definition
  spellings?: Spellings
}
