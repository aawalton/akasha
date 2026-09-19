import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const alexaThyme = {
  id: "01a0657d-ada7-7f0e-9e5a-b55048331c58",
  type: "page-type/story-read",
  slug: "alexa-thyme",
  title: "Alexa Thyme",
  world: "world/alexa-thyme",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CP5J7K9Y",
      externalLink: "https://www.amazon.com/dp/B0CP5J7K9Y",
    },
  ],
  rank: "B",
  following: true,
  tags: ["System World"],
  unit: "unit/words",
} as const satisfies StoryRead
