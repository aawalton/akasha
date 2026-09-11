import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const blackfireFireball = {
  id: "01a06572-95b6-71e3-a91a-f8652d9b28bb",
  type: "world-spell",
  slug: "blackfire-fireball",
  title: "Blackfire Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
