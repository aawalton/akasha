import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sandVeil = {
  id: "01a06572-95de-779b-9dd3-121af9ded18f",
  type: "page-type/world-spell",
  slug: "sand-veil",
  title: "Sand Veil",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
