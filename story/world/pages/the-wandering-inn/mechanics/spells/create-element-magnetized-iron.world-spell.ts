import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createElementMagnetizedIron = {
  id: "01a06572-95bb-7053-91e6-cc9e52a35a0f",
  type: "page-type/world-spell",
  slug: "create-element-magnetized-iron",
  title: "Create Element: Magnetized Iron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
