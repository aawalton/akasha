import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00021 = {
  id: "01a0e4da-c957-72ef-b9b1-a24f69c01be8",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-021",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 21,
  turnStatus: "turn-status/writer",
  action:
    "I reach out with the broom and hook it around one of the worms, pulling it into the salt",
  beats: [
    "Nala reaches the broom out past the salt and hooks its bristles round the nearer small bookworm.",
    "It is heavier than it looks, twenty-odd pounds of wet grey weight that will not come easily.",
    "The bookworm twists and clamps its round jagged mouth on the worn bristles.",
    "It wrenches back hard, and the broom handle tears out of Nala's hands.",
    "The handle skids across the oval's edge as it goes, scuffing a gap a hand wide in the salt.",
    "Out on the floor, the bookworm worries the broom head, chewing the bristles.",
    "The second bookworm stops circling and lifts its blind head toward the gap.",
  ],
  lore: ["place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
