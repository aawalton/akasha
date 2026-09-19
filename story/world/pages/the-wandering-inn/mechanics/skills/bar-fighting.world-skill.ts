import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barFighting = {
  id: "01a06575-97f3-74fa-b80b-85806c97ec8e",
  type: "page-type/world-skill",
  slug: "bar-fighting",
  title: "Bar Fighting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
