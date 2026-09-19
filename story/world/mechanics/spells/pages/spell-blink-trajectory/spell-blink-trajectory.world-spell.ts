import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellBlinkTrajectory = {
  id: "01a06572-95e2-706a-b689-4e7f87f2b99c",
  type: "page-type/world-spell",
  slug: "spell-blink-trajectory",
  title: "Spell: Blink Trajectory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
