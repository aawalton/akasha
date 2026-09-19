import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const storedShock = {
  id: "01a06572-95e4-7d37-bb17-da5190ae5dc9",
  type: "page-type/world-spell",
  slug: "stored-shock",
  title: "Stored Shock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
