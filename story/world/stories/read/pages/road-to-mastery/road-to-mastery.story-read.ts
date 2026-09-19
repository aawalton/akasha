import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const roadToMastery = {
  id: "01a0657d-ada7-7e22-9741-d053cd61f736",
  type: "page-type/story-read",
  slug: "road-to-mastery",
  title: "Road to Mastery",
  world: "world/road-to-mastery",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C6CLGDWP",
      externalLink: "https://www.amazon.com/dp/B0C6CLGDWP",
    },
  ],
  rank: "B",
  tags: ["System Apocalypse"],
  unit: "unit/words",
} as const satisfies StoryRead
