import type { MessagedPersona } from "akasha/alan/track/daily/days/properties/messaged-persona.relation-property.types.ts"
import type { MessagesSent } from "akasha/alan/track/daily/days/properties/messages-sent.number-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type PersonaMessages = List<{
  persona: MessagedPersona
  sent: MessagesSent
}>
