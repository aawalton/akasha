import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crewSecondWind = {
  id: "01a06575-97ff-7f22-b3a5-2d1d85999f91",
  type: "page-type/world-skill",
  slug: "crew-second-wind",
  title: "Crew: Second Wind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
