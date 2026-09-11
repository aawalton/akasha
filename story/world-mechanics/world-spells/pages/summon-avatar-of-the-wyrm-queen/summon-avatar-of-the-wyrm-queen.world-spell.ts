import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonAvatarOfTheWyrmQueen = {
  id: "01a06572-95e4-7bea-acfa-1afa9ee40f55",
  type: "world-spell",
  slug: "summon-avatar-of-the-wyrm-queen",
  title: "Summon: Avatar of the Wyrm Queen",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
