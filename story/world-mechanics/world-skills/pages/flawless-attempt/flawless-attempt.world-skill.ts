import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flawlessAttempt = {
  id: "01a06575-980e-7214-8572-82919f60de23",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flawless-attempt",
  title: "Flawless Attempt",
  world: "the-wandering-inn",
  aliases: ["flawless-attempts"],
  references: "jsonl",
} as const satisfies WorldSkill
