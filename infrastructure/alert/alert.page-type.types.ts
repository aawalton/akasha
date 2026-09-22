import type { Person } from "akasha/agent/seat/properties/person.relation-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Alert = Page & {
  title: Title
  definition: Definition
  person?: Person
}
