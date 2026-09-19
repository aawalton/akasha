import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneflesh = {
  id: "01a06572-95e3-701a-b1d5-ce3b8c105986",
  type: "page-type/world-spell",
  slug: "stoneflesh",
  title: "Stoneflesh",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
