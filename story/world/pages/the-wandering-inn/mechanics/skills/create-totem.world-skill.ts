import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createTotem = {
  id: "01a06575-97ff-7907-a390-0d2c4b329787",
  type: "page-type/world-skill",
  slug: "create-totem",
  title: "Create Totem",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.575Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
