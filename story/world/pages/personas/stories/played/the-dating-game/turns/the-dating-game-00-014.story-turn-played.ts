import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00014 = {
  id: "01a0e364-c344-7aa0-95e2-f227dccfd648",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-014",
  cover: "image/image-45c546663e7e8c82",
  coverAfter: "She looks at you with a squint, narrow and professional and entirely",
  ownLength: 211,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 14,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"Ah, that makes sense. I can totally see why you would enjoy Carl now. The characters really do have strong voices. I shared an elevator with Matt Dimon at LitRPG Con last year, he's a fun guy. If you like voices though, you should definitely try The Wandering Inn. They actually had to swap audio book narrators because there are so many characters with distinct voices that the narrator got overwhelmed after the first 5 million or so words. I've actually been considering making my own custom narration with AI voice synthesis so I can get all the characters right and have them consistent across the whole series.\"",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T09:58:00.000Z",
} as const satisfies StoryTurnPlayed
