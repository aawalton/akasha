import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const illumination = {
  id: "01a06572-95cb-731e-a24a-a6b27740e61e",
  type: "page-type/world-spell",
  slug: "illumination",
  title: "Illumination",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
