import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantaneousOrder = {
  id: "01a06575-981f-7e05-a677-21b426c88e40",
  type: "page-type/world-skill",
  slug: "instantaneous-order",
  title: "Instantaneous Order",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-skill/open-the-pantries-the-wandering-inn"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.607Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
