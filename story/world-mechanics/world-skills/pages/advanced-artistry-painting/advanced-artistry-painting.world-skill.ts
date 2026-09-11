import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const advancedArtistryPainting = {
  id: "01a06575-97e9-7784-8698-6b17aad35a41",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "advanced-artistry-painting",
  title: "Advanced Artistry (Painting)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
