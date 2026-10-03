import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const emberdeep0005TheDrownedHall = {
  id: "01a0fe83-368b-7d7b-abaf-f7b736c5b5f2",
  type: "page-type/story-chapter-written",
  slug: "emberdeep-0005-the-drowned-hall",
  cover: "image/image-a4bfeb8fcee8d3d8",
  position: 5,
  unit: "unit/words",
  title: "The Drowned Hall",
  story: "story-written/emberdeep",
  ownLength: 3914,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/emberdeep-elowen",
    "lore/emberdeep-nala",
    "lore/emberdeep-wren",
    "place/emberdeep-fennick",
    "place/emberdeep-second-level",
  ],
  characters: [
    "character-player/emberdeep-nala",
    "character-other/emberdeep-wren",
    "character-other/emberdeep-elowen",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  scenes: [
    "image/image-4700d328cb4b6c76",
    "image/image-a4bfeb8fcee8d3d8",
    "image/image-e2d847515039eb0e",
  ],
} as const satisfies StoryChapterWritten
