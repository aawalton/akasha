import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stasisBox = {
  id: "01a06572-95e2-7858-8b02-ecf3bbf871e0",
  type: "page-type/world-spell",
  slug: "stasis-box",
  title: "Stasis Box",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
