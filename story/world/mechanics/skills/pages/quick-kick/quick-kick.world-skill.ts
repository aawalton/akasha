import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickKick = {
  id: "01a0657d-029b-73bd-89e9-03c9475f8e96",
  type: "page-type/world-skill",
  slug: "quick-kick",
  title: "Quick Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
