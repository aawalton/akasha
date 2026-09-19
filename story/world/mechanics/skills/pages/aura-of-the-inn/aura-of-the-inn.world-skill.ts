import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheInn = {
  id: "01a06575-97f0-7719-9960-af252e8047e7",
  type: "page-type/world-skill",
  slug: "aura-of-the-inn",
  title: "Aura of the Inn",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
