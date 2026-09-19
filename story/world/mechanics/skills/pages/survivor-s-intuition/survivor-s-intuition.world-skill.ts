import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const survivorSIntuition = {
  id: "01a0657d-0303-7dd0-9ede-59be15be7e0f",
  type: "page-type/world-skill",
  slug: "survivor-s-intuition",
  title: "Survivor’s Intuition",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
