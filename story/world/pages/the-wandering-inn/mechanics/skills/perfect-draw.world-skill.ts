import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectDraw = {
  id: "01a0657d-028f-79b9-8ac0-afe9b60b4513",
  type: "page-type/world-skill",
  slug: "perfect-draw",
  title: "Perfect Draw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
