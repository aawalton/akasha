import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flawlessDefence = {
  id: "01a06575-980e-7209-868d-10337fb68197",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flawless-defence",
  title: "Flawless Defence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
