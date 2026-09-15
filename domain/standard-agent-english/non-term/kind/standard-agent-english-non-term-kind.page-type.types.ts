import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type StandardAgentEnglishNonTermKind = Page & {
  definition: Definition
}
