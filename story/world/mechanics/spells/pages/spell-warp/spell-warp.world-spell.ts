import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellWarp = {
  id: "01a06572-95e2-7cb1-9afd-a168dce74f13",
  type: "page-type/world-spell",
  slug: "spell-warp",
  title: "Spell Warp",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
