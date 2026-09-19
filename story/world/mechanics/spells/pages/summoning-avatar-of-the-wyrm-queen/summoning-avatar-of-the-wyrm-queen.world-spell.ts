import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summoningAvatarOfTheWyrmQueen = {
  id: "01a06572-95e4-72f2-920a-394af5de6081",
  type: "page-type/world-spell",
  slug: "summoning-avatar-of-the-wyrm-queen",
  title: "Summoning: Avatar of the Wyrm-Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
