import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandLightning = {
  id: "01a06572-95c6-773f-af9f-932aa01e0d69",
  type: "page-type/world-spell",
  slug: "grand-lightning",
  title: "Grand Lightning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
