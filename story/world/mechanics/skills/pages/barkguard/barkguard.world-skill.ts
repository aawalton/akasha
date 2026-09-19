import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barkguard = {
  id: "01a06575-97f3-7ac5-aaf9-a01c75db8834",
  type: "page-type/world-skill",
  slug: "barkguard",
  title: "Barkguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
