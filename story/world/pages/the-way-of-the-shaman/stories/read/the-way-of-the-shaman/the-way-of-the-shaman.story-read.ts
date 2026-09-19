import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theWayOfTheShaman = {
  id: "01a0657d-ada7-7c8f-b53d-d9bddc43275c",
  type: "page-type/story-read",
  slug: "the-way-of-the-shaman",
  title: "The Way of the Shaman",
  world: "world/the-way-of-the-shaman",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C9P3YF",
      externalLink: "https://www.amazon.com/dp/B074C9P3YF",
    },
  ],
  rank: "C",
  tags: ["VRMMO"],
  unit: "unit/words",
} as const satisfies StoryRead
