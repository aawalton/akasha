import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const auraMute = {
  id: "01a06572-95b5-73bf-aacb-f970259247cb",
  type: "page-type/world-spell",
  slug: "aura-mute",
  title: "Aura Mute",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
