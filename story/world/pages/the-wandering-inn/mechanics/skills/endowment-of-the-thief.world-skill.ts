import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const endowmentOfTheThief = {
  id: "01a06575-9808-735c-8d9b-173458eea139",
  type: "page-type/world-skill",
  slug: "endowment-of-the-thief",
  title: "Endowment of the Thief",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
