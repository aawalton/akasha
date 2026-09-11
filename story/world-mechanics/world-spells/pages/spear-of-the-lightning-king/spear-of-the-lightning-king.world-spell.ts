import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spearOfTheLightningKing = {
  id: "01a06572-95e1-7bd2-95fd-90c4c99b37b8",
  type: "world-spell",
  slug: "spear-of-the-lightning-king",
  title: "Spear of the Lightning King",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
