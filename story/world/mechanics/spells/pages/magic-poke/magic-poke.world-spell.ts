import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicPoke = {
  id: "01a06572-95d1-7915-8612-dec39b491187",
  type: "page-type/world-spell",
  slug: "magic-poke",
  title: "Magic Poke",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
