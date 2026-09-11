import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const whiteflameJet = {
  id: "01a06572-95ea-71ba-8e5a-f9fcba41abdc",
  type: "world-spell",
  slug: "whiteflame-jet",
  title: "Whiteflame Jet",
  world: "the-wandering-inn",
  aliases: ["—Whiteflame Jet"],
  references: "jsonl",
} as const satisfies WorldSpell
