import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const erraticManeuvering = {
  id: "01a06575-9809-7f16-a966-c7e05142b184",
  type: "page-type/world-skill",
  slug: "erratic-maneuvering",
  title: "Erratic Maneuvering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
