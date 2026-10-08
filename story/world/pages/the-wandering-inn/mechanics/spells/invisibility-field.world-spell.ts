import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisibilityField = {
  id: "01a06572-95cb-779d-81cc-7278ea7c28f9",
  type: "page-type/world-spell",
  slug: "invisibility-field",
  title: "Invisibility Field",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
