import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boundlessLeap = {
  id: "01a06575-97f8-7cb1-bbfa-3e1835f6388a",
  type: "page-type/world-skill",
  slug: "boundless-leap",
  title: "Boundless Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
