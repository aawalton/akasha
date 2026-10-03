import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const emberdeep0002ChalkArrows = {
  id: "01a0fdf3-631b-769b-9a51-0e5ce453352c",
  type: "page-type/story-chapter-written",
  slug: "emberdeep-0002-chalk-arrows",
  cover: "image/image-76fa37fb40cb2d87",
  ownProgress: 52,
  position: 2,
  unit: "unit/words",
  title: "Chalk Arrows",
  story: "story-written/emberdeep",
  ownLength: 4729,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: [
    '"falling asleep, that waking up still here might be the worst" - ch1: slept on the Deep, not home',
    '"Nobody says what happens after the third" - Nobody Acts',
  ],
  lore: [
    "lore/emberdeep-elowen",
    "lore/emberdeep-nala",
    "lore/emberdeep-wren",
    "place/emberdeep-deep",
    "place/emberdeep-first-level",
    "place/emberdeep-guild-hall",
  ],
  characters: [
    "character-player/emberdeep-nala",
    "character-other/emberdeep-wren",
    "character-other/emberdeep-elowen",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  scenes: [
    "image/image-2c4242ee0f9e9dc7",
    "image/image-76fa37fb40cb2d87",
    "image/image-b7ec1a8a14bf8e0a",
    "image/image-d5f677ce8b87acd3",
    "image/image-f632ba9a165f0a8c",
  ],
  pictured: [
    {
      cover: "image/image-2c4242ee0f9e9dc7",
      coverAfter: "The light changes the moment you pass beneath it. The sun is behind you,",
      setting: "the ramp and gate below the Mouth",
    },
    {
      cover: "image/image-76fa37fb40cb2d87",
      coverAfter: "The Long Hall opens up round you in the lamplight a little at a time.",
      setting: "the Long Hall",
    },
    {
      cover: "image/image-b7ec1a8a14bf8e0a",
      coverAfter: "The Well Room is square and high, and in the middle of it is a well.",
      setting: "the Well Room",
    },
    {
      cover: "image/image-d5f677ce8b87acd3",
      coverAfter: "There's a side room off the Well Room, small and half-choked with rubble where",
      setting: "the rubble side room off the Well Room",
    },
    {
      cover: "image/image-f632ba9a165f0a8c",
      coverAfter: "Then Wren leads you on, past the Well Room, along another passage and another,",
      setting: "the Dry Stair",
    },
  ],
} as const satisfies StoryChapterWritten
