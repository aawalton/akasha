import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const songAdventureOfALifetime = {
  id: "01a0657d-02c7-7451-8714-1045e093a2d7",
  type: "page-type/world-skill",
  slug: "song-adventure-of-a-lifetime",
  title: "Song: Adventure of a Lifetime",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
