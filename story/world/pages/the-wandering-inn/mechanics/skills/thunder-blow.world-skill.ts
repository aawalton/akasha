import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thunderBlow = {
  id: "01a0657d-0315-75c0-ab9a-7800f3629dc4",
  type: "page-type/world-skill",
  slug: "thunder-blow",
  title: "Thunder Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
