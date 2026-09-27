import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00023 = {
  id: "01a0e3d7-41d9-7206-9e7b-4219b9a9e9d6",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-023",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 23,
  turnStatus: "turn-status/writer",
  action: "I walk back to my neighborhood",
  beats: [
    "Alan leaves the stream trail and walks back up the hill from campus toward his neighborhood.",
    "The afternoon is going long and gold, the shadows of the houses stretching across the lawns.",
    "Sprinklers tick across the yards, and somewhere a screen door bangs.",
    "Above the rooftops Y Mountain holds the late light, the white letter bright on the slope.",
    "He turns onto Apple Avenue, his own street, quiet in the late Saturday afternoon.",
    "His house is just ahead at 1350.",
  ],
} as const satisfies StoryTurnPlayed
