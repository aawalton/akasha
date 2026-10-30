import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedPolish00009 = {
  id: "01a18e59-dc53-78fd-b9f5-22bc0c51ed02",
  type: "page-type/story-turn-played",
  slug: "gifted-polish-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-polish"],
  position: 9,
  prose: "txt",
  stepStatus: "step-status/beats",
  action:
    "I stay still and listen to the woman humming, trying to hum the same three sounds back with her in my head.",
  beats: "jsonl",
  lore: ["lore/gifted-polish-nala", "place/gifted-polish-world-womb"],
  createdAt: "2026-10-30T19:46:56.211Z",
  updatedAt: "2026-10-30T19:49:04.951Z",
  ownLength: 94,
  outcomes: "jsonl",
  characters: ["character-player/gifted-polish-nala"],
  endsAt: "2026-10-29T09:35:00.000Z",
} as const satisfies StoryTurnPlayed
