import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterFarCast = {
  id: "01a06575-9817-7e97-8a54-c77e257c1cce",
  type: "page-type/world-skill",
  slug: "greater-far-cast",
  title: "Greater Far Cast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
