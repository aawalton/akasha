import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIii00025 = {
  id: "01a0eb5e-7ef7-79ad-b689-ca67e51b52ae",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iii-00-025",
  cover: "image/image-98f41d78035ee117",
  coverAfter: "Across the lobby, at the desk, the golden ropes flicker once, a",
  ownLength: 209,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iii"],
  position: 25,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iii-nala",
    "character-other/super-supportive-gorgon",
    "character-other/otherwhere-iii-onn-desveth",
  ],
  stepStatus: "step-status/player",
  action:
    "“I will exercise my right. I would request Esh-erdi as my trusted witness. He should be on Earth soon to celebrate his inesvul if he isn’t here already. As I am new to this world, he is the only one I would trust.”",
  beats: "jsonl",
  lore: [
    "lore/otherwhere-iii-nala",
    "lore/otherwhere-iii-onn-desveth",
    "lore/super-supportive-esh",
    "lore/super-supportive-gorgon",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2037-01-31T10:48:00.000Z",
} as const satisfies StoryTurnPlayed
