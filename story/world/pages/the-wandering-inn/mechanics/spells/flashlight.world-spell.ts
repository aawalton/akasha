import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashlight = {
  id: "01a06572-95c4-7d92-bafe-129526de7acf",
  type: "page-type/world-spell",
  slug: "flashlight",
  title: "Flashlight",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
