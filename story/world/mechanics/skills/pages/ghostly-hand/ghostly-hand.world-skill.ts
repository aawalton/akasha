import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ghostlyHand = {
  id: "01a06575-9814-75b7-8fe7-fcba6213e2a2",
  type: "page-type/world-skill",
  slug: "ghostly-hand",
  title: "Ghostly Hand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
