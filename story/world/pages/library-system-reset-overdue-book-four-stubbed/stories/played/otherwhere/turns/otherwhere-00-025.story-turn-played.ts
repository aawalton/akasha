import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00025 = {
  id: "01a0e4f4-9ddc-7ef6-a091-e9b6b4eacce5",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-025",
  ownLength: 116,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 25,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
  ],
  turnStatus: "turn-status/recorders",
  action: "I tackle it into the salt, holding it down with my weight until it stops moving",
  beats: [
    "Nala throws her whole weight forward and drives the bookworm down into the salt line.",
    "She lies across it, fists locked behind its mouth, torn arm shaking but holding.",
    "It bucks under her once, twice, shrieking into the salt, then the shriek thins to a hiss.",
    "Its skin shrinks and greys beneath her; the thrashing slows, then stops.",
    "She stays on it, breathing hard, until it is a hard grey coil, alive and still.",
    "One coil lies under her, the other beside her in the ruined oval; her left sleeve is soaked red.",
    "Beyond the columns, further back in the gloom, the wet chewing goes on.",
  ],
  issues: [
    '"Two dried coils lie beside her in the ruined oval" - only 024\'s coil is in it; one is under her',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
