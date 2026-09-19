import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const songOfRejuvenation = {
  id: "01a0657d-02c7-7d83-a0cd-fe0489620ef5",
  type: "page-type/world-skill",
  slug: "song-of-rejuvenation",
  title: "Song of Rejuvenation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
