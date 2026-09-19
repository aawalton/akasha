import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const aThousandLi = {
  id: "01a0657d-ada7-7bfe-a1c5-a1e5adc2ec09",
  type: "page-type/story-read",
  slug: "a-thousand-li",
  title: "A Thousand Li",
  world: "world/a-thousand-li",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07VXJFRFV",
      externalLink: "https://www.amazon.com/dp/B07VXJFRFV",
    },
  ],
  rank: "B",
  tags: ["Cultivation"],
  unit: "unit/words",
} as const satisfies StoryRead
