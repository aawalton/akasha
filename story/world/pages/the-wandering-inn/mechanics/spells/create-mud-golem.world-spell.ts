import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createMudGolem = {
  id: "01a06572-95bb-705d-b4cd-cc819bd5197e",
  type: "page-type/world-spell",
  slug: "create-mud-golem",
  title: "Create Mud Golem",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
