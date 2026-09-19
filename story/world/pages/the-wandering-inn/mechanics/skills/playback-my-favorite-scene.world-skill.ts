import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const playbackMyFavoriteScene = {
  id: "01a0657d-0295-7ab3-bb7f-1cb8b5c12639",
  type: "page-type/world-skill",
  slug: "playback-my-favorite-scene",
  title: "Playback: My Favorite Scene",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
