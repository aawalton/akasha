import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const playbackMyFavoriteScene = {
  id: "01a0657d-0295-7ab3-bb7f-1cb8b5c12639",
  type: "world-skill",
  slug: "playback-my-favorite-scene",
  title: "Playback: My Favorite Scene",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
