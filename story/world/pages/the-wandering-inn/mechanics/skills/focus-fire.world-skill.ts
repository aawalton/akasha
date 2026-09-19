import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const focusFire = {
  id: "01a06575-980f-7a25-a1aa-af181460eb0c",
  type: "page-type/world-skill",
  slug: "focus-fire",
  title: "Focus Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
