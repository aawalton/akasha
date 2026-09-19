import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const headhunter = {
  id: "01a06575-9818-7dc2-9051-69b32a5b643c",
  type: "page-type/world-skill",
  slug: "headhunter",
  title: "Headhunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
