import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flickclawBlades = {
  id: "01a06575-980e-7bde-a735-604a472d1644",
  type: "page-type/world-skill",
  slug: "flickclaw-blades",
  title: "Flickclaw Blades",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
