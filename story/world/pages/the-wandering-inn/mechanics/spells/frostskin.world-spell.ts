import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostskin = {
  id: "01a06572-95c5-772b-bc5c-31ff4da66855",
  type: "page-type/world-spell",
  slug: "frostskin",
  title: "Frostskin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
