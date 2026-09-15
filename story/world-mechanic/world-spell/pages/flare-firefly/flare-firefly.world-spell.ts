import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const flareFirefly = {
  id: "01a06572-95c3-783e-8092-3c84d2c80614",
  type: "world-spell",
  slug: "flare-firefly",
  title: "Flare Firefly",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
