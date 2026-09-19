import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const howlOfThePlains = {
  id: "01a06575-981a-718d-96e8-e38afa00c6b9",
  type: "page-type/world-skill",
  slug: "howl-of-the-plains",
  title: "Howl of the Plains",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
