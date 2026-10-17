import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00013 = {
  id: "01a14bde-a05e-76e0-a8da-f27f5b86c738",
  type: "page-type/story-turn-played",
  slug: "thornford-00-013",
  cover: "image/image-4d0bd79c6f5c87e1",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 13,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/player",
  action:
    "\"I'd be delighted to come. I'll have to work hard though, to get both dresses done in time, which means it is time for me to sleep, which means it is time for you to go unless you are joining me.\"",
  beats: "jsonl",
  lore: ["lore/thornford-fae-bargains-and-glamour", "lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
  roleplayed: true,
  coverAfter: "The knock comes again, three times, light and quick.",
  createdAt: "2026-10-17T21:57:23.678Z",
  updatedAt: "2026-10-17T22:04:04.475Z",
  ownLength: 164,
  endsAt: "2026-04-30T05:30:00.000Z",
} as const satisfies StoryTurnPlayed
