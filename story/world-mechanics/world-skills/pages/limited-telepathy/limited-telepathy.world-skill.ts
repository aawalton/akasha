import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const limitedTelepathy = {
  id: "01a0657d-023f-72d2-94ef-68d1b8069107",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "limited-telepathy",
  title: "Limited Telepathy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
