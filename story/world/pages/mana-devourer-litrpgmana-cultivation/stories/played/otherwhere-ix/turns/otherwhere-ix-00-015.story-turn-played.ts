import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00015 = {
  id: "01a0eb51-9a27-7f64-ba87-972bd763dd20",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-015",
  cover: "image/image-0a2e93ed391c72b3",
  coverAfter: "You end up on your side in the glassgrass, your palms full",
  ownLength: 186,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 15,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    "I take it to the ground and wrestle it back, trying to get at its belly with the blades.",
  beats: "jsonl",
  issues: [
    '"the last quill still clamped" - she pulled five spine quills and only one has snapped',
  ],
  lore: ["lore/otherwhere-ix-nala", "lore/otherwhere-ix-shardback"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T15:58:00.000Z",
} as const satisfies StoryTurnPlayed
