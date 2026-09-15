import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const heatedAir = {
  id: "01a06572-95c8-7bee-8db5-ee740e374ab2",
  type: "world-spell",
  slug: "heated-air",
  title: "Heated Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
