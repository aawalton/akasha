import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blueBolt = {
  id: "01a06572-95b6-7a6c-ac7e-4b52c58241d4",
  type: "page-type/world-spell",
  slug: "blue-bolt",
  title: "Blue Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
