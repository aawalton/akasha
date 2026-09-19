import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ironhide = {
  id: "01a06575-9820-7c38-89d3-d65bee778a82",
  type: "page-type/world-skill",
  slug: "ironhide",
  title: "Ironhide",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
