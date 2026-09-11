import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sandAvalanche = {
  id: "01a06572-95de-7642-be24-f2acaec9d0a0",
  type: "world-spell",
  slug: "sand-avalanche",
  title: "Sand Avalanche",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
