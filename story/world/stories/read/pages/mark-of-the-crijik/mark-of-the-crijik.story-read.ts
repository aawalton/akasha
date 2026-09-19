import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const markOfTheCrijik = {
  id: "01a0657d-ada3-7e62-a146-6b09015e328c",
  type: "page-type/story-read",
  slug: "mark-of-the-crijik",
  title: "Mark of the Crijik",
  world: "world/mark-of-the-crijik",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "50243",
      externalLink: "https://www.royalroad.com/fiction/50243/mark-of-the-crijik",
    },
  ],
  author: "ThinkTwice",
  rank: "C",
  following: true,
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Comedy",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Reincarnation",
    "School Life",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
