import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00058 = {
  id: "01a0e7df-7f2c-7e3a-a6b4-7dbae48c3685",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-058",
  ownLength: 130,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 58,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "**Great, anything you need from me to get the shelvers working? If not, I'll keep going until this part is done.**",
  beats: [
    "Nala asks Links if the shelvers need anything from her; if not, she'll finish this section.",
    "Links: \"They're slow getting up. Centuries asleep. They'll be up here by morning.\"",
    'Links: "Then they want you. A golem works only when its Librarian tells it to, out loud."',
    "She goes back to the heaps beside the counter, the right shelves still glowing faintly for her.",
    "Most go on the low shelves; for the high ones she rolls over one of the hall's tall ladders.",
    "Book after book slides home, and the hall's gold light edges brighter as she works.",
    "The glow fades from the shelves just as she slides the last book of the counter's heaps into place.",
  ],
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
} as const satisfies StoryTurnPlayed
