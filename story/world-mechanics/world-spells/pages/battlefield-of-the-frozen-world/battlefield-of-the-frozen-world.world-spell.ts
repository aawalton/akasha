import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const battlefieldOfTheFrozenWorld = {
  id: "01a06572-95b5-7b65-a58c-3000def838f1",
  type: "world-spell",
  slug: "battlefield-of-the-frozen-world",
  title: "Battlefield of the Frozen World",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
