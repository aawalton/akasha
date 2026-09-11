import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bindSpell = {
  id: "01a06572-95b6-7007-a50c-5f070eb8fcd3",
  type: "world-spell",
  slug: "bind-spell",
  title: "Bind Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
