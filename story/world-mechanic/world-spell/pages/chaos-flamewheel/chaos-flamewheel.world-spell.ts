import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const chaosFlamewheel = {
  id: "01a06572-95b8-753d-a415-6526599613cc",
  type: "world-spell",
  slug: "chaos-flamewheel",
  title: "Chaos Flamewheel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
