import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildRiot = {
  id: "01a0657d-032e-7b36-881e-619cfe7e9fc1",
  type: "page-type/world-skill",
  slug: "wild-riot",
  title: "Wild Riot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
