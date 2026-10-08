import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forcewall = {
  id: "01a06572-95c5-7b05-8468-3ec985ef3aef",
  type: "page-type/world-spell",
  slug: "forcewall",
  title: "Forcewall",
  world: "world/the-wandering-inn",
  appearanceCount: 25,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
