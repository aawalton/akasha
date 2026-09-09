import type { WorldSpell } from "../../world-spell.page-type.ts"

export const roomOfParadise = {
  id: "01a06572-95de-7df1-8a07-a68d5a1b168f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "room-of-paradise",
  title: "Room of Paradise",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
