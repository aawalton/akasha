import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const gifted = {
  id: "01a0e9b3-1cb0-7d10-8141-d9958442ce60",
  type: "page-type/story-read",
  slug: "gifted",
  author: "Ellake",
  following: true,
  unit: "unit/words",
  title: "Gifted",
  world: "world/gifted",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "181303",
      externalLink: "https://www.royalroad.com/fiction/181303/gifted",
    },
  ],
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Strategy",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Cozy",
    "High Fantasy",
    "Magic",
    "Reincarnation",
    "School Life",
    "Slice of Life",
    "Strong Lead",
  ],
  publicationStatus: "ongoing",
} as const satisfies StoryRead
