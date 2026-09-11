import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flareWyvern = {
  id: "01a06572-95c3-7b95-aea1-a9e2cbb9da4c",
  type: "world-spell",
  slug: "flare-wyvern",
  title: "Flare Wyvern",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
