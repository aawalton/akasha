import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const somniaOnline = {
  id: "01a0657d-ada7-74c1-b812-9efb8f243801",
  type: "story-read",
  slug: "somnia-online",
  title: "Somnia Online",
  world: "somnia-online",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07GVDX3G8",
      externalLink: "https://www.amazon.com/dp/B07GVDX3G8",
    },
  ],
  tags: ["VRMMO"],
  unit: "words",
} as const satisfies StoryRead
