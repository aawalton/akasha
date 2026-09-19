import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empireLowBornMilitias = {
  id: "01a06575-9807-77ba-a6cd-d6416905a7d0",
  type: "page-type/world-skill",
  slug: "empire-low-born-militias",
  title: "Empire: Low-born Militias",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
