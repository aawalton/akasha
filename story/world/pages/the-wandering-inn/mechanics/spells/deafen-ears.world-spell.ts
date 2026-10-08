import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deafenEars = {
  id: "01a06572-95bb-750f-b896-8ae9d3e1171a",
  type: "page-type/world-spell",
  slug: "deafen-ears",
  title: "Deafen Ears",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
