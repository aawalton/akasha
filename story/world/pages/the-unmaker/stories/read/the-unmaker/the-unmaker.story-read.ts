import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theUnmaker = {
  id: "01a166df-5d9f-7a69-b901-438477b2a2b4",
  type: "page-type/story-read",
  slug: "the-unmaker",
  author: "Maradina",
  following: false,
  unit: "unit/words",
  title: "The Unmaker",
  world: "world/the-unmaker",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "86114",
      externalLink: "https://www.royalroad.com/fiction/86114/the-unmaker",
    },
  ],
  externalTags: [
    "LitRPG",
    "Progression",
    "Strategy",
    "Psychological",
    "Female Lead",
    "Action",
    "Fantasy",
    "Horror",
    "Crafting",
    "High Fantasy",
    "Local Protagonist",
    "Mythos",
  ],
  publicationStatus: "completed",
  readLater: true,
  createdAt: "2026-10-23T03:47:56.959Z",
  updatedAt: "2026-10-23T03:47:56.959Z",
} as const satisfies StoryRead
