import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const conversationEntryKind = {
  id: "01a0d44b-cd25-7991-af25-daeb77ddffb2",
  type: "page-type/select-property",
  slug: "conversation-entry-kind",
  propertySlug: "kind",
  definition: "what one entry of a seat's conversation is",
  values: ["person", "agent", "tool", "turn-end", "message"],
  types: "ts",
} as const satisfies SelectProperty
