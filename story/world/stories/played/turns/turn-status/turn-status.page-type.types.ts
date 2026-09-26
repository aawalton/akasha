import type { Decisions } from "akasha/domain/properties/decisions.record-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type TurnStatus = Page & {
  title: Title
  definition: Definition
  decisions?: Decisions
}
