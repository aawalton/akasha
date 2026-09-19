import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectReduction = {
  id: "01a0657d-028f-7943-927b-aaf9d30fa5d7",
  type: "page-type/world-skill",
  slug: "perfect-reduction",
  title: "Perfect Reduction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
