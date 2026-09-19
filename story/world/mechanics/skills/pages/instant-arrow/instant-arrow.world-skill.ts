import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantArrow = {
  id: "01a06575-981f-799f-b6ea-ca9139248111",
  type: "page-type/world-skill",
  slug: "instant-arrow",
  title: "Instant Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
