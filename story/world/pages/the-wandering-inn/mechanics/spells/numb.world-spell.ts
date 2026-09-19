import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const numb = {
  id: "01a06572-95da-70b2-a5d0-691eaeba9a4a",
  type: "page-type/world-spell",
  slug: "numb",
  title: "Numb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
