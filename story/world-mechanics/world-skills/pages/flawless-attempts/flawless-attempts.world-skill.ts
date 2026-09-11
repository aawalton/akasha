import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flawlessAttempts = {
  id: "01a06575-980e-7145-9d34-b72a9f89ac58",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flawless-attempts",
  title: "Flawless Attempts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
