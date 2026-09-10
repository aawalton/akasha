import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { MessagedPersona } from "./messaged-persona.relation-property.ts"
import type { MessagesSent } from "./messages-sent.number-property.ts"

export type PersonaMessage = {
  persona: MessagedPersona
  sent: MessagesSent
}

export type PersonaMessages = List<PersonaMessage>

export const personaMessages = {
  id: "01a082e2-4994-7f71-aa2d-ad0fc9b437f9",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "persona-messages",
  propertySlug: "persona-messages",
  definition: "how many messages each persona was written on a day",
  properties: [
    { pageProperty: "relation-property/messaged-persona", required: true, many: false },
    { pageProperty: "number-property/messages-sent", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One persona has one record on a day.",
    },
    {
      invariantKind: "departure",
      statement: "A record's count rises as the day runs rather than a record landing per message.",
    },
    {
      invariantKind: "departure",
      statement: "A persona written to on no day has no record on that day.",
    },
    {
      invariantKind: "absence",
      statement: "No record says when in the day a message was written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a count into points.",
    },
  ],
} as const satisfies RecordProperty
