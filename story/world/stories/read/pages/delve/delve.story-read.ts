import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const delve = {
  id: "01a0657d-ada1-7905-9a2c-47bf2e18b947",
  type: "page-type/story-read",
  slug: "delve",
  rank: "C",
  unit: "unit/words",
  title: "Delve",
  world: "world/delve",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "25225",
      externalLink: "https://www.royalroad.com/fiction/25225/delve",
    },
  ],
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Male Lead",
    "Slice of Life",
    "Action",
    "Adventure",
    "Drama",
    "Fantasy",
    "High Fantasy",
    "Magic",
    "Strong Lead",
  ],
} as const satisfies StoryRead
