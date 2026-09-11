import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const iClaimYourFate = {
  id: "01a06575-981b-70cf-888f-e156b71e9d9c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "i-claim-your-fate",
  title: "I Claim Your Fate",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
