import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostbite = {
  id: "01a06572-95c5-7927-aeb0-068c6ebae8ba",
  type: "page-type/world-spell",
  slug: "frostbite",
  title: "Frostbite",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
