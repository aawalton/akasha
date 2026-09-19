import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const salamanderSEmbers = {
  id: "01a06572-95de-7e9f-88f3-7da69e66671c",
  type: "page-type/world-spell",
  slug: "salamander-s-embers",
  title: "Salamander’s Embers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
