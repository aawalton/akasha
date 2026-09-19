import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const qualityScent = {
  id: "01a0657d-029a-7449-97e2-a48aae609acc",
  type: "page-type/world-skill",
  slug: "quality-scent",
  title: "Quality Scent",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
