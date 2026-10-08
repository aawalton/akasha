import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const chainLightning = {
  id: "01a06572-95b8-78fe-83df-94bd4e36b770",
  type: "page-type/world-spell",
  slug: "chain-lightning",
  title: "Chain Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 28,
  aliases: ["Chain…Lightning"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
