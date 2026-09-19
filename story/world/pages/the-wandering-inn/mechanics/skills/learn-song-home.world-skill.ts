import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const learnSongHome = {
  id: "01a06575-9822-7d24-bd64-43443047e73d",
  type: "page-type/world-skill",
  slug: "learn-song-home",
  title: "Learn Song: Home",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
