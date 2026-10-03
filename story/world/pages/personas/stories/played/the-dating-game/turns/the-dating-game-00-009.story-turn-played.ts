import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00009 = {
  id: "01a0e333-2548-708a-8fc8-fd138690a37e",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-009",
  cover: "image/image-9fdddf29cd0afcef",
  coverAfter: "She lifts the black-and-gold headphones up off her collarbones and settles them",
  ownLength: 262,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 9,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I squeeze back and hold her hand while we walk. \"Wow, three thousand years. So, what do you do to pass the time? I've thought a lot about what I'd do with endless time, since that's how my life feels anyways. I have a goal to learn everything, I read a lot of books, sometimes watch shows and movies, especially anime, listen to music. What are you into?\"",
  beats: "jsonl",
  lore: ["lore/the-dating-game-echo"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T09:48:00.000Z",
} as const satisfies StoryTurnPlayed
