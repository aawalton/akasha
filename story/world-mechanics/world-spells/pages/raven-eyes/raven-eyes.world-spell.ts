import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ravenEyes = {
  id: "01a06572-95dc-7b2e-b3b6-e89baa43f60c",
  type: "world-spell",
  slug: "raven-eyes",
  title: "Raven Eyes",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
