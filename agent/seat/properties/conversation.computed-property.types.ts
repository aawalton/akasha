import type { ConversationAt } from "akasha/agent/seat/properties/conversation-at.instant-property.types.ts"
import type { ConversationEntryKind } from "akasha/agent/seat/properties/conversation-entry-kind.select-property.types.ts"
import type { ConversationImages } from "akasha/agent/seat/properties/conversation-images.number-property.types.ts"
import type { ConversationLine } from "akasha/agent/seat/properties/conversation-line.text-property.types.ts"
import type { ConversationSender } from "akasha/agent/seat/properties/conversation-sender.text-property.types.ts"
import type { ConversationText } from "akasha/agent/seat/properties/conversation-text.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Conversation = List<{
  kind: ConversationEntryKind
  text?: ConversationText
  images?: ConversationImages
  line?: ConversationLine
  sender?: ConversationSender
  at?: ConversationAt
}>
