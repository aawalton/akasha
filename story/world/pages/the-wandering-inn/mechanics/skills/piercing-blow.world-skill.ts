import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingBlow = {
  id: "01a0657d-0294-7b81-a5e0-a5d7771558b7",
  type: "page-type/world-skill",
  slug: "piercing-blow",
  title: "Piercing Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
