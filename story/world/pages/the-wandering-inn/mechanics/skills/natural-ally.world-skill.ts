import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalAlly = {
  id: "01a0657d-0271-7006-be5e-06ea8e5e0b27",
  type: "page-type/world-skill",
  slug: "natural-ally",
  title: "Natural Ally",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
