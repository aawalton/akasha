import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingSwing = {
  id: "01a0657d-0294-77c2-8a9a-27ac24810a82",
  type: "page-type/world-skill",
  slug: "piercing-swing",
  title: "Piercing Swing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
