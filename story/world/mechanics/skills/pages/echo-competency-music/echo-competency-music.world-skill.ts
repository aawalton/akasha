import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const echoCompetencyMusic = {
  id: "01a06575-9806-7b31-84ee-db3efa057501",
  type: "page-type/world-skill",
  slug: "echo-competency-music",
  title: "Echo Competency: Music",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
