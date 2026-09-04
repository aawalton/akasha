import type { WorldSpell } from "../../world-spell.page-type.ts"

export const containedRoom = {
  id: "01a06572-95ba-7ecd-8088-3b27626417bb",
  pageTypeSlug: "world-spell",
  slug: "contained-room",
  title: "Contained Room",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
