import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hellfirePalm = {
  id: "01a06575-9819-7833-bf90-96b08aea0517",
  type: "page-type/world-skill",
  slug: "hellfire-palm",
  title: "Hellfire Palm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
