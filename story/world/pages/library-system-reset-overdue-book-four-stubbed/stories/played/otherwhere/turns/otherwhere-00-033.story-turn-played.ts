import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00033 = {
  id: "01a0e52b-b64c-750e-8228-48e1abcf5695",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-033",
  ownLength: 135,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 33,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-links",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
    "character-other/otherwhere-engorged-bookworm-05",
    "character-other/otherwhere-engorged-bookworm-06",
  ],
  turnStatus: "turn-status/reviewers",
  action:
    "“Okay, we’ll start there.” I quietly go back and get the cooler and collect the dormant bookworms, the start spring books back onto the shelves, taking care to listen for the large bookworm and stay far away from it.",
  beats: [
    '"Okay, we\'ll start there," Nala says.',
    "In the break room she empties the dead cooler, a knee-high chest, and drags it out into the hall.",
    "She keeps well out from the back steps, listening, but no roar comes from the dark.",
    "The coils weigh a few pounds each; she carries them two at a time and packs all five in.",
    "She drags the loaded cooler back to the break room and shuts its lid on them.",
    "A tone rings through the hall, and the alarm she'd stopped hearing falls silent.",
    "A window opens in her vision: Status: Emergency Power Mode Ended. Power: 27%. Kitchen: Waking.",
    "Somewhere off the hall, doors unseal with a long sigh.",
  ],
  lore: ["place/otherwhere-main-hall", "place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
