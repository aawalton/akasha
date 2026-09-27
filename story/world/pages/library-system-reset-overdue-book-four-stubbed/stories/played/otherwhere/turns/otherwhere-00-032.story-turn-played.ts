import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00032 = {
  id: "01a0e524-5aa2-7fbe-a2b5-fa257f614f40",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-032",
  cover: "image/image-0fd91336e0de0f1d",
  ownLength: 132,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 32,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-links",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
    "character-other/otherwhere-engorged-bookworm-05",
    "character-other/otherwhere-engorged-bookworm-06",
  ],
  turnStatus: "turn-status/player",
  action:
    "“So, you don’t have a plan. Okay, how can we get you more power to wake up the kitchen without finishing off the big bookworm first?”",
  beats: [
    "Nala asks how they can get him power to wake the kitchen without finishing the big one first.",
    'Links bristles. "I have plans. They all cost power I haven\'t got." His eyes flicker blue.',
    '"Three more and I leave Emergency Power Mode. The alarm stops and the kitchen wakes."',
    '"Those coils feed me once they\'re stored dry and safe for the night owls, not left on the floor."',
    '"The dead cooler in the break room is dry and tight. It\'ll keep them."',
    '"And every book you put back on its right shelf gives me a little. Match the mark on the spine."',
    'He flicks his tail at the scattered books. "There are rather a lot of them."',
  ],
  issues: ["\"I just can't carry salt\" - Links's solid purple hand carried the broom in turn 9"],
  lore: ["lore/otherwhere-universe", "place/otherwhere-hall-back", "place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
} as const satisfies StoryTurnPlayed
