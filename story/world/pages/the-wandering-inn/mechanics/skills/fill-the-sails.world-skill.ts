import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fillTheSails = {
  id: "01a06575-980c-7114-ad2b-693af93c10a5",
  type: "page-type/world-skill",
  slug: "fill-the-sails",
  title: "Fill the Sails",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
