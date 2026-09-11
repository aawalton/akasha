import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const imperialAppraiser = {
  id: "01a06575-981d-7237-8be0-bc3a5f707482",
  type: "world-skill",
  slug: "imperial-appraiser",
  title: "Imperial Appraiser",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
