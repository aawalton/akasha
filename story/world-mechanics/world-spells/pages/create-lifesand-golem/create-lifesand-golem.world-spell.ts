import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createLifesandGolem = {
  id: "01a06572-95bb-70ec-90df-9321b2568192",
  type: "world-spell",
  slug: "create-lifesand-golem",
  title: "Create Lifesand Golem",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
