import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const flamestrike = {
  id: "01a06572-95c3-7a53-8cb5-0d068a88ffcf",
  type: "world-spell",
  slug: "flamestrike",
  title: "Flamestrike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
