import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const saltAndLamplight0003TheBoatSong = {
  id: "01a0fd3b-b750-7e6e-93d6-4356d7c91151",
  type: "page-type/story-chapter-written",
  slug: "salt-and-lamplight-0003-the-boat-song",
  cover: "image/image-1d60a060b39b22e2",
  position: 3,
  unit: "unit/words",
  title: "The Boat Song",
  story: "story-written/salt-and-lamplight",
  ownLength: 3184,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: [
    '"You stand at the cottage window" - Morwenna swung every cottage shutter closed that morning',
  ],
  lore: [
    "lore/salt-and-lamplight-morwenna",
    "lore/salt-and-lamplight-nala",
    "lore/salt-and-lamplight-world",
    "place/salt-and-lamplight-morrow-head",
  ],
  characters: [
    "character-player/salt-and-lamplight-nala",
    "character-other/salt-and-lamplight-morwenna",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  scenes: [
    "image/image-b056a40293e9e9b4",
    "image/image-70f4d03842a21dba",
    "image/image-094df81a55931be4",
    "image/image-d2092ebdaec6ba83",
    "image/image-19858c9cee80f2d0",
    "image/image-36046ed5ab80536b",
    "image/image-334a7960c0e8ab06",
    "image/image-9f7ee007137889fe",
    "image/image-5359741c52bdf650",
    "image/image-1d60a060b39b22e2",
  ],
} as const satisfies StoryChapterWritten
