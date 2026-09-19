import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const intimidatingGlare = {
  id: "01a06575-9820-71e1-9d25-0a3a0bb3ffa0",
  type: "page-type/world-skill",
  slug: "intimidating-glare",
  title: "Intimidating Glare",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
