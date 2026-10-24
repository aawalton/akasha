import type { TypedAt } from "akasha/agent/seat/properties/typed-at.instant-property.types.ts"
import type { TypingPerson } from "akasha/agent/seat/properties/typing-person.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Typing = List<{
  person: TypingPerson
  at: TypedAt
}>
