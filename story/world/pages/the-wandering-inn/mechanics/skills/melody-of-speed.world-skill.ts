import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const melodyOfSpeed = {
  id: "01a0657d-024c-7bef-8292-7be9ca58b558",
  type: "page-type/world-skill",
  slug: "melody-of-speed",
  title: "Melody of Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
