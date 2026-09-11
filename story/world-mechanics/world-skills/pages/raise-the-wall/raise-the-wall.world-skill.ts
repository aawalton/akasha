import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const raiseTheWall = {
  id: "01a0657d-029c-7601-9c2b-18ba14b68ee7",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "raise-the-wall",
  title: "Raise the Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
