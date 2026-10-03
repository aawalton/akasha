import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00018 = {
  id: "01a0eb50-b544-7c7c-8e95-ae87fa073c5d",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-018",
  cover: "image/image-f766507a3be04aa6",
  coverAfter: "She points with her chin at the base of the stems by",
  ownLength: 400,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 18,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iv-nala",
    "character-other/otherwhere-iv-tie-bo",
    "character-other/otherwhere-iv-granny-hua",
  ],
  stepStatus: "step-status/player",
  action:
    "“Beyond the infestation of insects? Hmm, have you tried diatomaceous earth? That is a decently good repellant for ordinary ants, but I’m not certain it would be easily available here. I’m scraps my answer for you is similar to what I told Tie Bo. I have a great deal of general knowledge, but when it comes to the specific flora and fauna of this region, you likely know much more than I.”",
  beats: "jsonl",
  lore: ["lore/otherwhere-iv-granny-hua", "lore/otherwhere-iv-nala"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/picture", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-29T06:41:00.000Z",
} as const satisfies StoryTurnPlayed
