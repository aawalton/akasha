import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const blink = {
  id: "01a06572-95b6-7d67-8b4e-2ec12732b722",
  type: "world-spell",
  slug: "blink",
  title: "Blink",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
