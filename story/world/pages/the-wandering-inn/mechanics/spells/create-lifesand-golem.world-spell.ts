import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createLifesandGolem = {
  id: "01a06572-95bb-70ec-90df-9321b2568192",
  type: "page-type/world-spell",
  slug: "create-lifesand-golem",
  title: "Create Lifesand Golem",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
