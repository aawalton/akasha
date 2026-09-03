import type { StoryRead } from "../../story-read.page-type.ts"

export const alexaThyme = {
  id: "01a0657d-ada7-7f0e-9e5a-b55048331c58",
  pageTypeSlug: "story-read",
  slug: "alexa-thyme",
  title: "Alexa Thyme",
  worldSlug: "alexa-thyme",
  source: "kindle",
  rank: "B",
  following: true,
  tags: ["System World"],
  unitSlug: "words",
} as const satisfies StoryRead
