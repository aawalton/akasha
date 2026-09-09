import type { WorldSpell } from "../../world-spell.page-type.ts"

export const roomOfStasis = {
  id: "01a06572-95de-7fa8-8d41-68a2d63feb94",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "room-of-stasis",
  title: "Room of Stasis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
