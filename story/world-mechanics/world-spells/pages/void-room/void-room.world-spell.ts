import type { WorldSpell } from "../../world-spell.page-type.ts"

export const voidRoom = {
  id: "01a06572-95e8-7a2d-a6f8-1184af7d644a",
  pageTypeSlug: "world-spell",
  slug: "void-room",
  title: "Void Room",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
