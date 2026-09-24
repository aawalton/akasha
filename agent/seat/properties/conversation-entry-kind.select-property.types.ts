import type { conversationEntryKind } from "akasha/agent/seat/properties/conversation-entry-kind.select-property.ts"

export type ConversationEntryKind = (typeof conversationEntryKind.values)[number]
