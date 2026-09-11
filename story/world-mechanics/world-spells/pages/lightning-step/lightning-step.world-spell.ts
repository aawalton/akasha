import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningStep = {
  id: "01a06572-95d0-762f-890e-11942b3e57bc",
  type: "world-spell",
  slug: "lightning-step",
  title: "Lightning Step",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
