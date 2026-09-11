import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const magicOfWill = {
  id: "01a0657d-0242-771f-b92d-e90db096f92a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "magic-of-will",
  title: "Magic of Will",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
