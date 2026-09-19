import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swiftAnimation = {
  id: "01a0657d-0303-7ec8-89c4-9478f08c8cef",
  type: "page-type/world-skill",
  slug: "swift-animation",
  title: "Swift Animation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
