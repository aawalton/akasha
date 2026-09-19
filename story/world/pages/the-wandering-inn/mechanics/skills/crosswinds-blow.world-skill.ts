import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crosswindsBlow = {
  id: "01a06575-97ff-74c9-aca1-ea470389f39c",
  type: "page-type/world-skill",
  slug: "crosswinds-blow",
  title: "Crosswinds Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
