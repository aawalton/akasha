import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const impossibleDodge = {
  id: "01a06575-981d-7856-b135-effb06ae0da1",
  type: "world-skill",
  slug: "impossible-dodge",
  title: "Impossible Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
