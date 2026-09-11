import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const vanity = {
  id: "01a0657d-0320-72de-8a7f-a0506d66255a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "vanity",
  title: "Vanity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
