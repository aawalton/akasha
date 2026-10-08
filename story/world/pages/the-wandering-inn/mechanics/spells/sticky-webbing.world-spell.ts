import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stickyWebbing = {
  id: "01a06572-95e3-7444-84cc-4a3e9a76b92d",
  type: "page-type/world-spell",
  slug: "sticky-webbing",
  title: "Sticky Webbing",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
