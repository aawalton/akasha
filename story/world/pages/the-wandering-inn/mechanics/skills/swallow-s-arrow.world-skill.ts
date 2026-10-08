import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swallowSArrow = {
  id: "01a0657d-0303-78ce-a3b6-5b97ace94923",
  type: "page-type/world-skill",
  slug: "swallow-s-arrow",
  title: "Swallow’s Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-skill/lesser-dragonbreath-arrow-lightning"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.723Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
