import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ashCloud = {
  id: "01a06572-95b5-7c69-8a99-8e30c858857d",
  type: "world-spell",
  slug: "ash-cloud",
  title: "Ash Cloud",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
