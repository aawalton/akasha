import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const eyeForTalent = {
  id: "01a06575-980a-7ad1-8315-2e9edd6c1df8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "eye-for-talent",
  title: "Eye for Talent",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
