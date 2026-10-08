import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const timeStop = {
  id: "01a06572-95e7-737b-9dea-d85e85eef74d",
  type: "page-type/world-spell",
  slug: "time-stop",
  title: "TIME STOP",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  aliases: ["Time Stop"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
