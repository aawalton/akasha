import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicPerfectAction = {
  id: "01a06575-97f4-7d46-90c0-ccbb6527aba5",
  type: "page-type/world-skill",
  slug: "basic-perfect-action",
  title: "Basic Perfect Action",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
