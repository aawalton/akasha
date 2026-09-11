import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const neutralizeOdor = {
  id: "01a06572-95d9-7ecd-bcb9-79705bf9b5e7",
  type: "world-spell",
  slug: "neutralize-odor",
  title: "Neutralize Odor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
