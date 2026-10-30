import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedPolish00007 = {
  id: "01a18e2d-a66b-757c-8190-a7e06d15de73",
  type: "page-type/story-turn-played",
  slug: "gifted-polish-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-polish"],
  position: 7,
  stepStatus: "step-status/game-master",
  action:
    "I go still and listen to the deep voice repeating its few sounds, trying to hold onto the shape of them.",
  lore: ["place/gifted-polish-world-womb"],
  createdAt: "2026-10-30T18:58:38.827Z",
  updatedAt: "2026-10-30T19:00:31.429Z",
  outcomes: "jsonl",
  endsAt: "2026-10-28T09:35:00.000Z",
} as const satisfies StoryTurnPlayed
