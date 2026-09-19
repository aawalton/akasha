import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sparkSlash = {
  id: "01a0657d-02c7-7989-ab9d-85a7faa32119",
  type: "page-type/world-skill",
  slug: "spark-slash",
  title: "Spark Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
