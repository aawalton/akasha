import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const protectTheInnocent = {
  id: "01a0657d-0297-79de-9588-c369e0b4650d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "protect-the-innocent",
  title: "Protect the Innocent",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
