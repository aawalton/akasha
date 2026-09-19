import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pardonTheJoke = {
  id: "01a0657d-0286-76e6-bd1d-0691df07f759",
  type: "page-type/world-skill",
  slug: "pardon-the-joke",
  title: "Pardon the Joke",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
