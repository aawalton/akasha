import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00066 = {
  id: "01a0e82b-7ba1-79db-b222-22e4fff95f64",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-066",
  ownLength: 118,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 66,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "**Okay, time for bed.** I go back to my room, take off the robe and slippers, lie down on the bed naked, and go to sleep.",
  beats: [
    "Nala tells Links it's time for bed and walks back through the amber hall to the quarters.",
    "She hangs the robe in the wardrobe, sets the slippers at its foot, and slips naked under the covers.",
    "The bed is soft and wide; the day's ache seeps out of her arms and back, and sleep takes her fast.",
    "Morning finds her rested and whole, mana full again, the Library's lights brightening.",
    "The smell of fresh bread drifts in from the kitchen.",
    "From the hall beyond the passage comes a sound new to her here: a slow creak of wood and brass.",
  ],
  lore: ["lore/otherwhere-golems", "lore/otherwhere-universe"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
} as const satisfies StoryTurnPlayed
