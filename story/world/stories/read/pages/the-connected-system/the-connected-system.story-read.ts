import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theConnectedSystem = {
  id: "01a0657d-ada7-7547-8b88-d8e85de79a6d",
  type: "page-type/story-read",
  slug: "the-connected-system",
  title: "The Connected System",
  world: "world/the-connected-system",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CW19LKFJ",
      externalLink: "https://www.amazon.com/dp/B0CW19LKFJ",
    },
  ],
  rank: "C",
  tags: ["System Apocalypse"],
  unit: "unit/words",
} as const satisfies StoryRead
