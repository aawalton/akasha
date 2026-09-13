import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const chrysalis = {
  id: "01a0657d-ada1-781d-8fa4-06246a43c533",
  type: "story-read",
  slug: "chrysalis",
  title: "Chrysalis",
  world: "chrysalis",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "22518",
      externalLink: "https://www.royalroad.com/fiction/22518/chrysalis",
    },
  ],
  author: "RinoZ",
  rank: "A",
  following: true,
  externalTags: [
    "LitRPG",
    "Reincarnation",
    "Comedy",
    "Non-Human Lead",
    "Adventure",
    "Fantasy",
    "Magic",
  ],
  unit: "words",
  prose: "txt",
} as const satisfies StoryRead
