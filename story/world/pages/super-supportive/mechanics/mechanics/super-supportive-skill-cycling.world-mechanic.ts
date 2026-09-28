import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSkillCycling = {
  id: "01a0e9f1-065f-793c-b386-119effee47b8",
  type: "page-type/world-mechanic",
  slug: "super-supportive-skill-cycling",
  title: "Skill cycling",
  world: "world/super-supportive",
  description: "The System taking skills off class lists and putting them back.",
} as const satisfies WorldMechanic
