import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ashCloud = {
  id: "01a06572-95b5-7c69-8a99-8e30c858857d",
  type: "page-type/world-spell",
  slug: "ash-cloud",
  title: "Ash Cloud",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
