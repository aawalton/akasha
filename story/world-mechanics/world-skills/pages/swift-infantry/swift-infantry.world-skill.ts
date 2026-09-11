import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const swiftInfantry = {
  id: "01a0657d-0303-79f6-b75b-93e8cf0ed485",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "swift-infantry",
  title: "Swift Infantry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
