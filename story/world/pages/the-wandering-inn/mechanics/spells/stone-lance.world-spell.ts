import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneLance = {
  id: "01a06572-95e3-7c27-aef8-efd0de676b7a",
  type: "page-type/world-spell",
  slug: "stone-lance",
  title: "Stone Lance",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
