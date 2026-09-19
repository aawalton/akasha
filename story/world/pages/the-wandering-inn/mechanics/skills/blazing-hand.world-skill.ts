import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blazingHand = {
  id: "01a06575-97f6-7a47-818d-72058786f8ab",
  type: "page-type/world-skill",
  slug: "blazing-hand",
  title: "Blazing Hand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
