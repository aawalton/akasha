import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flamestrike = {
  id: "01a06572-95c3-7a53-8cb5-0d068a88ffcf",
  type: "page-type/world-spell",
  slug: "flamestrike",
  title: "Flamestrike",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
