import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lancingThrusts = {
  id: "01a06575-9821-713d-b097-59ebbe2654f1",
  type: "page-type/world-skill",
  slug: "lancing-thrusts",
  title: "Lancing Thrusts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
