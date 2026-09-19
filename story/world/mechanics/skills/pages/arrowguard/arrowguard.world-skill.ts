import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowguard = {
  id: "01a06575-97ed-7e67-a3dd-344bf9923a32",
  type: "page-type/world-skill",
  slug: "arrowguard",
  title: "Arrowguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
