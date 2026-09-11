import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const stolenLives = {
  id: "01a0657d-02fa-7815-a37b-430052e4d80b",
  type: "world-skill",
  slug: "stolen-lives",
  title: "Stolen Lives",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
