import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const poisonImmunity = {
  id: "01a0657d-0295-79ac-b157-9285b65fa9ba",
  type: "page-type/world-skill",
  slug: "poison-immunity",
  title: "Poison Immunity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
