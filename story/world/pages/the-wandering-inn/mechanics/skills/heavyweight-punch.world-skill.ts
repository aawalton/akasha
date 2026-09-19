import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heavyweightPunch = {
  id: "01a06575-9819-7443-90ca-090305412fa9",
  type: "page-type/world-skill",
  slug: "heavyweight-punch",
  title: "Heavyweight Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
