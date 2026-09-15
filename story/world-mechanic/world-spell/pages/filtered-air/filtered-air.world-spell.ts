import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const filteredAir = {
  id: "01a06572-95c0-7fa6-9d34-2a1dbcd412f1",
  type: "page-type/world-spell",
  slug: "filtered-air",
  title: "Filtered Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
