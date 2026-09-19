import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const allTerrainStep = {
  id: "01a06575-97ea-76e7-b67d-a527aa355988",
  type: "page-type/world-skill",
  slug: "all-terrain-step",
  title: "All Terrain Step",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
