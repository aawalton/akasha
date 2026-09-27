import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00022 = {
  id: "01a0e4e0-8f1d-7e4c-ae32-465c3d455886",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-022",
  ownLength: 146,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 22,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
  ],
  turnStatus: "turn-status/reviewers",
  action: "I wait for it to come to the gap, then tackle it and hold it in the salt",
  beats: [
    "Nala crouches by the scuffed gap and waits, weight forward.",
    "The second small bookworm noses into the gap and squeezes through, salt scraping its sides raw.",
    "It shrieks as it comes, skin puckering along both flanks.",
    "Nala throws herself on it as it clears the line.",
    "Its skin is wet and slick; it slides out from under her arms and she hits the floor on her side.",
    "It rears and lunges at her face; she jerks her head aside and its teeth clack shut on air.",
    "Now the bookworm is inside the oval with her, between Nala and the gap, head swaying.",
  ],
  lore: ["place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
