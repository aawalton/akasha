import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const frostGeyser = {
  id: "01a06572-95c5-7988-acbc-d55716cad6e4",
  type: "world-spell",
  slug: "frost-geyser",
  title: "Frost Geyser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
