import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00007 = {
  id: "01a0e31d-a998-7289-ba15-b848a77b0e95",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-007",
  cover: "image/image-136c4eeed3c18b02",
  coverAfter: "The cold feels great after the climb, cool on your face and",
  ownLength: 295,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 7,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I laugh and splash her back playfully from the fountain. The cool water feels great with the exertion of the hike. As we start walking again, I turn to her and ask \"So, I know this might be sensitive, but I noticed you mostly repeat things I've said. Why is that? No judgment, I'm autistic myself and that's not uncommon for autistic kids, so it's not unfamiliar for me.\"",
  beats: "jsonl",
  issues: ['"Then to you." - prose leaves out the beat where she watches whether he understands'],
  lore: ["lore/the-dating-game-echo"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
  endsAt: "2026-09-26T09:44:00.000Z",
} as const satisfies StoryTurnPlayed
