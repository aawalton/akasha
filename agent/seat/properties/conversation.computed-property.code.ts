import {
  conversationOf,
  type IsPerson,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.computed-property-module.code.ts"
import type { Conversation } from "akasha/agent/seat/properties/conversation.computed-property.types.ts"
import type { Reach, Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Kept = { readonly transcriptPath?: string }

const PERSON = "person"

function isPersonIn(reach: Reach): IsPerson {
  return (sender) => reach.target(`${PERSON}/${sender}`) !== null
}

export const work: Work<Kept, Conversation> = (page, reach) => {
  const path = page.transcriptPath
  if (typeof path !== "string" || path === "") return null
  const filed = reach.file(path)
  return filed === null ? null : conversationOf(filed, isPersonIn(reach))
}
