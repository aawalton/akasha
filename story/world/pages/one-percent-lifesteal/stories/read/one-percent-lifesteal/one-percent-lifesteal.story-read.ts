import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const onePercentLifesteal = {
  id: "01a0657d-ada7-774a-84c1-ae1d70773d66",
  type: "page-type/story-read",
  slug: "one-percent-lifesteal",
  title: "1% Lifesteal",
  world: "world/one-percent-lifesteal",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DGWCJ6JP",
      externalLink: "https://www.amazon.com/dp/B0DGWCJ6JP",
    },
  ],
  rank: "C",
  tags: ["Dark"],
  unit: "unit/words",
} as const satisfies StoryRead
