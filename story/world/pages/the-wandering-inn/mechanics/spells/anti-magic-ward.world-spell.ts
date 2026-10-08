import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const antiMagicWard = {
  id: "01a06572-95b4-7480-a5b3-dd3da62f8a8e",
  type: "page-type/world-spell",
  slug: "anti-magic-ward",
  title: "Anti-Magic Ward",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
