import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostbiteWave = {
  id: "01a06572-95c5-76bc-8393-0b013e363c43",
  type: "page-type/world-spell",
  slug: "frostbite-wave",
  title: "Frostbite Wave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
