import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const bushidoOnline = {
  id: "01a0657d-ada7-7bf6-afc7-afc7fee36604",
  type: "page-type/story-read",
  slug: "bushido-online",
  title: "Bushido Online",
  world: "world/bushido-online",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07959MGTF",
      externalLink: "https://www.amazon.com/dp/B07959MGTF",
    },
  ],
  rank: "C",
  tags: ["VRMMO"],
  unit: "unit/words",
} as const satisfies StoryRead
