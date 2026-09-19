import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const timeStop = {
  id: "01a06572-95e7-737b-9dea-d85e85eef74d",
  type: "page-type/world-spell",
  slug: "time-stop",
  title: "TIME STOP",
  world: "world/the-wandering-inn",
  aliases: ["Time Stop"],
  references: "jsonl",
} as const satisfies WorldSpell
