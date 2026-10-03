import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00006 = {
  id: "01a0e315-abd8-7c0d-85b2-49d5e24d7be9",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-006",
  cover: "image/image-6361e197b48175aa",
  coverAfter: "Echo gets there first. She bends and drinks, long and grateful, her",
  ownLength: 266,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 6,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"This side path will take us up to Khyv peak. It's a bit of a longer hike, about two and a half hours from canyon entrance to the top, but the views are great. It's a little harder on conversations though, since the trail is narrower, so I'm thinking lets stay on the main trail for now. The main trail also has the best drinking fountains, fresh cold mountain spring water.\"",
  beats: "jsonl",
  lore: ["place/the-dating-game-rock-canyon"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
  endsAt: "2026-09-26T09:41:00.000Z",
} as const satisfies StoryTurnPlayed
