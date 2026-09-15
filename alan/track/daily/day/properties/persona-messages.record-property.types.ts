import type { MessagedPersona } from "akasha/alan/track/daily/day/properties/messaged-persona.relation-property.types.ts"
import type { MessagesSent } from "akasha/alan/track/daily/day/properties/messages-sent.number-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type PersonaMessages = List<{
  persona: MessagedPersona
  sent: MessagesSent
}>
