import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const embers = {
  id: "01a06572-95bf-74a3-a39d-9c8582f0e2e5",
  type: "world-spell",
  slug: "embers",
  title: "Embers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
