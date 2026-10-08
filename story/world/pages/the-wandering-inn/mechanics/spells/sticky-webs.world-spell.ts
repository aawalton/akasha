import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stickyWebs = {
  id: "01a06572-95e3-7bb5-a8da-72161622f636",
  type: "page-type/world-spell",
  slug: "sticky-webs",
  title: "Sticky Webs",
  world: "world/the-wandering-inn",
  appearanceCount: 23,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
