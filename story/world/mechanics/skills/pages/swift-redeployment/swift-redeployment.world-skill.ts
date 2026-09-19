import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swiftRedeployment = {
  id: "01a0657d-0303-7fce-a8ce-35fe454c9eb6",
  type: "page-type/world-skill",
  slug: "swift-redeployment",
  title: "Swift Redeployment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
