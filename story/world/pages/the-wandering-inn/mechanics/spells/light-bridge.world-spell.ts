import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBridge = {
  id: "01a06572-95ce-78a3-a1f3-1d62bf9d2350",
  type: "page-type/world-spell",
  slug: "light-bridge",
  title: "Light Bridge",
  world: "world/the-wandering-inn",
  appearanceCount: 23,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.406Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
