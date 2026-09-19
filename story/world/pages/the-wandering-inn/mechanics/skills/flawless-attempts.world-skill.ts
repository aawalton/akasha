import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flawlessAttempts = {
  id: "01a06575-980e-7145-9d34-b72a9f89ac58",
  type: "page-type/world-skill",
  slug: "flawless-attempts",
  title: "Flawless Attempts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
