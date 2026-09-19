import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bodyOfFlames = {
  id: "01a06572-95b6-7826-b9d0-3bc6671c8fff",
  type: "page-type/world-spell",
  slug: "body-of-flames",
  title: "Body of Flames",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
