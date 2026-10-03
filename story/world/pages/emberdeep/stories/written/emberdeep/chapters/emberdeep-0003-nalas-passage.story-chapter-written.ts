import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const emberdeep0003NalasPassage = {
  id: "01a0fe30-3a18-7155-8655-39e5b7c8d7ed",
  type: "page-type/story-chapter-written",
  slug: "emberdeep-0003-nalas-passage",
  cover: "image/image-4d2c65868fdd198d",
  position: 3,
  unit: "unit/words",
  title: "Nala's Passage",
  story: "story-written/emberdeep",
  ownLength: 4063,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: ['"turns and looks up at you, and waits" - No Prompt'],
  lore: [
    "lore/emberdeep-elowen",
    "lore/emberdeep-nala",
    "lore/emberdeep-world",
    "lore/emberdeep-wren",
    "place/emberdeep-corbel-house",
    "place/emberdeep-deep",
    "place/emberdeep-first-level",
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
  scenes: ["image/image-4d2c65868fdd198d", "image/image-bb359ad90313988b"],
} as const satisfies StoryChapterWritten
