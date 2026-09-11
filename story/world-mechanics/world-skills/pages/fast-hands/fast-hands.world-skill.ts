import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastHands = {
  id: "01a06575-980b-7429-a300-a9fbb05e9105",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fast-hands",
  title: "Fast Hands",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
