import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const crewSecondWind = {
  id: "01a06575-97ff-7f22-b3a5-2d1d85999f91",
  type: "world-skill",
  slug: "crew-second-wind",
  title: "Crew: Second Wind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
