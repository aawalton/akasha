import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellBlinkTrajectory = {
  id: "01a06572-95e2-706a-b689-4e7f87f2b99c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spell-blink-trajectory",
  title: "Spell: Blink Trajectory",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
