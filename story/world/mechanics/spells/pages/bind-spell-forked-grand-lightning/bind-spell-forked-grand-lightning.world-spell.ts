import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bindSpellForkedGrandLightning = {
  id: "01a06572-95b5-766d-8ccc-946d754755a5",
  type: "page-type/world-spell",
  slug: "bind-spell-forked-grand-lightning",
  title: "Bind Spell: Forked Grand Lightning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
