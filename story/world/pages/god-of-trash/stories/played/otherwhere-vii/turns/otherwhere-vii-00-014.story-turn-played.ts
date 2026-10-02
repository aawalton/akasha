import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00014 = {
  id: "01a0eb58-96c5-70a3-8d31-3dc06e518b3a",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-014",
  cover: "image/image-602508bfdce472a2",
  coverAfter: "Hild looks you over once more, from the clogs up to the",
  ownLength: 115,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 14,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vii-nala",
    "character-other/otherwhere-vii-hild",
    "character-other/otherwhere-vii-joan-reeve",
  ],
  stepStatus: "step-status/player",
  action: "“Anything you need from me before morning?”",
  beats: [
    "Nala asks Hild if there's anything she needs from her before morning.",
    "Hild looks her over once more, from the clogs up to the hands, and ticks it off on her fingers.",
    '"Come fed. Come shod. Come with those hands greased and slept on, not raw."',
    '"Bring nothing but yourself. I\'ve a hooked knife and a rush basket, and I count both back at dusk."',
    "She glances past Nala to Joan at the board, and her voice drops.",
    "\"One thing more, and it's for tonight. Joan's worn thin with four days of watching that child.\"",
    '"Sit an hour with Bet tonight, so her mother can shut her eyes. I\'ll show you what to do."',
  ],
  lore: ["lore/otherwhere-vii-hild", "lore/otherwhere-vii-joan-reeve", "lore/otherwhere-vii-nala"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T12:23:00.000Z",
} as const satisfies StoryTurnPlayed
