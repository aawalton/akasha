import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickGallop = {
  id: "01a0657d-029b-7b32-b3a5-a5880596727b",
  type: "page-type/world-skill",
  slug: "quick-gallop",
  title: "Quick Gallop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
