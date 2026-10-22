import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const lifeIsASideQuest = {
  id: "01a165cd-8088-704b-acc1-d5e7dfd84f11",
  type: "page-type/story-read",
  slug: "life-is-a-side-quest",
  author: "JW Chambers",
  following: false,
  unit: "unit/words",
  title: "Life is a Side Quest",
  world: "world/life-is-a-side-quest",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "124819",
      externalLink: "https://www.royalroad.com/fiction/124819/life-is-a-side-quest",
    },
  ],
  externalTags: [
    "LitRPG",
    "Urban Fantasy",
    "Comedy",
    "Multiple Lead Characters",
    "Action",
    "Adventure",
    "Fantasy",
    "Female Lead",
    "First Contact",
    "Magic",
    "Male Lead",
  ],
  publicationStatus: "ongoing",
  readLater: true,
  createdAt: "2026-10-22T22:48:49.032Z",
  updatedAt: "2026-10-22T22:48:49.032Z",
} as const satisfies StoryRead
