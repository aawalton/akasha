import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00015 = {
  id: "01a0eae8-5c2d-7061-8288-0a3019a11559",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-015",
  cover: "image/image-e452498798382b1a",
  coverAfter: "Granny Hua's place is the last in the west lane. A hut,",
  ownLength: 622,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 15,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iv-nala",
    "character-other/otherwhere-iv-zhao-jun",
    "character-other/otherwhere-iv-tie-bo",
  ],
  stepStatus: "step-status/player",
  action:
    '"Yes, it sounds like poison is the best options to improve our chances. We could poison the heads of the spears as well as the stakes. I will come and I will pray for your success."',
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-iv-boar-hunt",
    "lore/otherwhere-iv-granny-hua",
    "lore/otherwhere-iv-headman-gu",
    "lore/otherwhere-iv-nala",
    "lore/otherwhere-iv-spirit-beast-tales",
    "lore/otherwhere-iv-tie-bo",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-29T06:30:00.000Z",
} as const satisfies StoryTurnPlayed
