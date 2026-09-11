import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const barrierOfTheDamned = {
  id: "01a06572-95b5-73da-a345-2604d35f3220",
  type: "world-spell",
  slug: "barrier-of-the-damned",
  title: "Barrier of the Damned",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
