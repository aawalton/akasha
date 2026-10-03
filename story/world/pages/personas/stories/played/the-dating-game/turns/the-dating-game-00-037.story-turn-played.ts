import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00037 = {
  id: "01a0e58f-c615-750f-a220-4668d84aa41c",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-037",
  cover: "image/image-e977d2e1543a6e39",
  coverAfter: "Grace stops beneath a tall pine, and the lantern light pools gold",
  ownLength: 102,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 37,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "“Nothing ever close or far. It just is. Almost like standing outside of time and looking at it from the side, other than this one moment I’m experiencing now.”",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-26T19:42:00.000Z",
} as const satisfies StoryTurnPlayed
