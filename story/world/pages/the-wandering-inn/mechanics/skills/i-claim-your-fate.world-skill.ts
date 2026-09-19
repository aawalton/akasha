import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iClaimYourFate = {
  id: "01a06575-981b-70cf-888f-e156b71e9d9c",
  type: "page-type/world-skill",
  slug: "i-claim-your-fate",
  title: "I Claim Your Fate",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
