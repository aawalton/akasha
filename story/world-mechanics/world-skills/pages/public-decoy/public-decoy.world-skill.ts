import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const publicDecoy = {
  id: "01a0657d-0297-76f5-a90b-7fe84801acef",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "public-decoy",
  title: "Public Decoy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
