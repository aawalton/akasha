import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const maidAscension = {
  id: "01a0e9b3-1cb0-7b3b-aecd-d8b469c28833",
  type: "page-type/story-read",
  slug: "maid-ascension",
  author: "Eru Dit",
  following: true,
  unit: "unit/words",
  title: "Maid Ascension",
  world: "world/maid-ascension",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "160304",
      externalLink: "https://www.royalroad.com/fiction/160304/maid-ascension",
    },
  ],
  externalTags: [
    "Progression",
    "Anti-Hero Lead",
    "Ruling Class",
    "Female Lead",
    "Secret Identity",
    "Action",
    "Fantasy",
    "Tragedy",
    "High Fantasy",
    "Local Protagonist",
    "Magic",
    "Strategy",
  ],
  publicationStatus: "ongoing",
} as const satisfies StoryRead
