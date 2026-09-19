import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const copyShape = {
  id: "01a06575-97fe-761c-9182-c807f5d321e8",
  type: "page-type/world-skill",
  slug: "copy-shape",
  title: "Copy Shape",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
