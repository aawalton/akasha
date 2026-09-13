import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const readyPlayerOne = {
  id: "01a0657d-ada7-75e3-b5b5-19088b5dc940",
  type: "story-read",
  slug: "ready-player-one",
  title: "Ready Player One",
  world: "ready-player-one",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B083977FTN",
      externalLink: "https://www.amazon.com/dp/B083977FTN",
    },
  ],
  rank: "C",
  tags: ["VRMMO"],
  unit: "words",
} as const satisfies StoryRead
