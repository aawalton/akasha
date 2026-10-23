import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const spellWeaver = {
  id: "01a16a51-1e0f-73a5-b2d8-dfc736ea94ad",
  type: "page-type/story-read",
  slug: "spell-weaver",
  author: "OverXelous",
  following: false,
  unit: "unit/words",
  title: "Spell Weaver",
  world: "world/spell-weaver",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "95904",
      externalLink: "https://www.royalroad.com/fiction/95904/spell-weaver",
    },
  ],
  externalTags: [
    "LitRPG",
    "Progression",
    "Cultivation",
    "Slice of Life",
    "Adventure",
    "Fantasy",
    "Magic",
  ],
  readLater: true,
  createdAt: "2026-10-23T19:51:03.438Z",
  updatedAt: "2026-10-23T19:51:03.438Z",
} as const satisfies StoryRead
