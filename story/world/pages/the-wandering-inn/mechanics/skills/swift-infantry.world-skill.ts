import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swiftInfantry = {
  id: "01a0657d-0303-79f6-b75b-93e8cf0ed485",
  type: "page-type/world-skill",
  slug: "swift-infantry",
  title: "Swift Infantry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
