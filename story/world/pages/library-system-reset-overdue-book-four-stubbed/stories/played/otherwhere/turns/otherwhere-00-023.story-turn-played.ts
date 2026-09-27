import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00023 = {
  id: "01a0e4e8-ab0d-77ad-ba23-08583f164f23",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-023",
  cover: "image/image-e66df2dcc5648c9d",
  ownLength: 173,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 23,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
  ],
  turnStatus: "turn-status/player",
  action:
    "I grab two handfuls of salt in my hands then grip it by the neck, holding it in the salt",
  beats: [
    "Nala scoops two fistfuls of salt from the oval's edge by the gap; it stings the scrape on her arm.",
    "She lunges and clamps both salted hands round the bookworm just behind its mouth.",
    "Its wet skin puckers under her fingers and goes dry and rough; this time her grip holds.",
    "She bears it down onto the salt line and pins it, jaws snapping a hand from her wrist.",
    "It shrieks and thrashes, then shudders, shrinking and greying as the salt draws it dry.",
    "It is nearly still, a stiffening coil under her hands, but not quite done.",
    "Where she scooped, the gap in the oval has opened wider than her forearm.",
    "Outside, the first bookworm drops the chewed broom and turns its blind head toward the wider gap.",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
