import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00027 = {
  id: "01a0e501-8556-776a-8ecb-f68094bd3052",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-027",
  cover: "image/image-e940bee9858a2d95",
  ownLength: 91,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 27,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-links",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
  ],
  turnStatus: "turn-status/player",
  action:
    "“Do you have some kind of magical healing for me, or do I need to do this the hard way?”",
  beats: [
    "Nala asks Links if he has some magical healing for her, or if it's the hard way.",
    "Links's ears flatten. \"You'd need to have learned healing from a book first, and you haven't.\"",
    "\"The hospital wing's shut and dark until I've the power to open it. Three worms doesn't buy that.\"",
    '"So, the hard way. Wash it at the break room tap, eat something, sit still for once."',
    '"I keep roots and vegetables a human can eat," he adds, grudging, "if you\'re not fussy."',
  ],
  issues: [
    '"toward the chewing, then back at your arm" - No Prompt',
    '"and says nothing more" - Leave It Open',
  ],
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
} as const satisfies StoryTurnPlayed
