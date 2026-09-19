import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const waterBridge = {
  id: "01a0657d-032c-7043-b3f0-3f89b5d1f320",
  type: "page-type/world-skill",
  slug: "water-bridge",
  title: "Water Bridge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
