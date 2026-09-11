import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const crossbowsOverwatch = {
  id: "01a06575-97ff-7516-8cd9-9c21957eb9d2",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "crossbows-overwatch",
  title: "Crossbows: Overwatch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
