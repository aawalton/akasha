import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const conversationEntryKind = {
  id: "01a0d44b-cd25-7991-af25-daeb77ddffb2",
  type: "page-type/select-property",
  slug: "conversation-entry-kind",
  propertySlug: "kind",
  definition: "the kind of a part of the conversation of a seat",
  values: ["person", "agent", "tool", "turn-end", "message"],
  types: "ts",
  createdAt: "2026-09-24T16:42:12.645Z",
  updatedAt: "2026-10-30T14:29:53.486Z",
} as const satisfies SelectProperty
