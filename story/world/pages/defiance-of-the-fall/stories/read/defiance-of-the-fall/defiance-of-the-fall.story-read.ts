import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const defianceOfTheFall = {
  id: "01a0657d-ada1-71cf-9695-e2b395d29c5d",
  type: "page-type/story-read",
  slug: "defiance-of-the-fall",
  title: "Defiance of the Fall",
  world: "world/defiance-of-the-fall",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "24709",
      externalLink: "https://www.royalroad.com/fiction/24709/defiance-of-the-fall",
    },
  ],
  rank: "C",
  externalTags: [
    "LitRPG",
    "Post Apocalyptic",
    "Cultivation",
    "Male Lead",
    "Sci-fi",
    "Action",
    "Adventure",
    "Fantasy",
    "Magic",
    "Strong Lead",
    "Supernatural",
  ],
  unit: "unit/words",
} as const satisfies StoryRead
