import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const freeBlow = {
  id: "01a06575-9810-76eb-99e4-fd1ba551c23b",
  type: "page-type/world-skill",
  slug: "free-blow",
  title: "Free Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
