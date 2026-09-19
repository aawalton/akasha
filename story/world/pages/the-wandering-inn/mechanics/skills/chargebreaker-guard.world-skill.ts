import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const chargebreakerGuard = {
  id: "01a06575-97fa-75e5-bca5-b92f2fdee916",
  type: "page-type/world-skill",
  slug: "chargebreaker-guard",
  title: "Chargebreaker Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
