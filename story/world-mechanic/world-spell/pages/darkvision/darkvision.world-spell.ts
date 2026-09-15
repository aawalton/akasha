import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const darkvision = {
  id: "01a06572-95bb-7d67-9981-b0f0d8c45257",
  type: "world-spell",
  slug: "darkvision",
  title: "Darkvision",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
