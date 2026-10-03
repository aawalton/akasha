import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00099 = {
  id: "01a0ff64-2924-73af-a294-73d3b1351e1a",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-099",
  cover: "image/image-4ae706c82eefef8e",
  ownLength: 238,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 99,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "“I’m sorry about your sheep, Ebba. We’ll take care of them, then get down to the town until this is sorted.” At that, I charge the sheep with my spear using Push to extend my reach as I stab into their necks from farther than I should be able to, then Pull to help me retract the spear. Rinse and repear.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-callow-beck",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-25T14:50:00.000Z",
  coverAfter: "A thin black thread is creeping down the grass toward the longhouse.",
} as const satisfies StoryTurnPlayed
