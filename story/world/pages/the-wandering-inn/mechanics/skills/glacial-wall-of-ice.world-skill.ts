import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const glacialWallOfIce = {
  id: "01a06575-9815-7996-a09a-b969dc597c1d",
  type: "page-type/world-skill",
  slug: "glacial-wall-of-ice",
  title: "Glacial Wall of Ice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
