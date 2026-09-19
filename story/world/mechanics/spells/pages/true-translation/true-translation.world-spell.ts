import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const trueTranslation = {
  id: "01a06572-95e7-7b61-855b-61bf0d7ef85d",
  type: "page-type/world-spell",
  slug: "true-translation",
  title: "True Translation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
