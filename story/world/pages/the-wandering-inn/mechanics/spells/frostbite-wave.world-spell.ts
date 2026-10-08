import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostbiteWave = {
  id: "01a06572-95c5-76bc-8393-0b013e363c43",
  type: "page-type/world-spell",
  slug: "frostbite-wave",
  title: "Frostbite Wave",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
