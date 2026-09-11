import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const wildRiot = {
  id: "01a0657d-032e-7b36-881e-619cfe7e9fc1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "wild-riot",
  title: "Wild Riot",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
