import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningJolt = {
  id: "01a06572-95d0-776b-ae0f-879cbcf0999c",
  type: "world-spell",
  slug: "lightning-jolt",
  title: "Lightning Jolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
