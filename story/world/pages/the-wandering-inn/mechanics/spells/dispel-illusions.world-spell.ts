import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dispelIllusions = {
  id: "01a06572-95bd-7798-9d7c-4e2123b02451",
  type: "page-type/world-spell",
  slug: "dispel-illusions",
  title: "Dispel Illusions",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
