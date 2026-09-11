import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createTotem = {
  id: "01a06575-97ff-7907-a390-0d2c4b329787",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "create-totem",
  title: "Create Totem",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
