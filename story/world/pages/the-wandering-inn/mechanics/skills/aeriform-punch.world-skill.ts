import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aeriformPunch = {
  id: "01a06575-97ea-7bcf-a5f0-4d126ea9eea9",
  type: "page-type/world-skill",
  slug: "aeriform-punch",
  title: "Aeriform Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
