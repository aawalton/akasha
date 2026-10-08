import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enthrallingGlance = {
  id: "01a06575-9809-74f2-bf6b-c3dae20f2705",
  type: "page-type/world-skill",
  slug: "enthralling-glance",
  title: "Enthralling Glance",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-skill/charming-smile"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
