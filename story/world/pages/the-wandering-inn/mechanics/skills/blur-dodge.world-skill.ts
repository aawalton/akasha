import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blurDodge = {
  id: "01a06575-97f6-7ebd-aa06-7459b5cd753e",
  type: "page-type/world-skill",
  slug: "blur-dodge",
  title: "Blur Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
