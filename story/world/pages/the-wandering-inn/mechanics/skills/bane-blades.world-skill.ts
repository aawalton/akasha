import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const baneBlades = {
  id: "01a06575-97f2-7e6e-ab50-8f19d4257359",
  type: "page-type/world-skill",
  slug: "bane-blades",
  title: "Bane Blades",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.562Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
