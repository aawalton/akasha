import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const speed = {
  id: "01a06572-95e2-788a-b356-4d9b7812f586",
  type: "page-type/world-spell",
  slug: "speed",
  title: "Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
