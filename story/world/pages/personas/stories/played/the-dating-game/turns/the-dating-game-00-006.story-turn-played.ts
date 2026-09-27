import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00006 = {
  id: "01a0e315-abd8-7c0d-85b2-49d5e24d7be9",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 6,
  turnStatus: "turn-status/world-builder",
  action:
    "\"This side path will take us up to Khyv peak. It's a bit of a longer hike, about two and a half hours from canyon entrance to the top, but the views are great. It's a little harder on conversations though, since the trail is narrower, so I'm thinking lets stay on the main trail for now. The main trail also has the best drinking fountains, fresh cold mountain spring water.\"",
} as const satisfies StoryTurnPlayed
