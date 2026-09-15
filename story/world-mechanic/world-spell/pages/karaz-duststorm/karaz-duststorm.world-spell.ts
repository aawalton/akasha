import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const karazDuststorm = {
  id: "01a06572-95cc-7ad5-805d-52f198ec6678",
  type: "world-spell",
  slug: "karaz-duststorm",
  title: "Karaz Duststorm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
