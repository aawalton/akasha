import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flareWyvern = {
  id: "01a06572-95c3-7b95-aea1-a9e2cbb9da4c",
  type: "page-type/world-spell",
  slug: "flare-wyvern",
  title: "Flare Wyvern",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
