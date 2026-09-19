import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const thePrimalHunter = {
  id: "01a0657d-ada5-71f0-bf49-36b935e70225",
  type: "page-type/story-read",
  slug: "the-primal-hunter",
  title: "The Primal Hunter",
  world: "world/the-primal-hunter",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "36049",
      externalLink: "https://www.royalroad.com/fiction/36049/the-primal-hunter",
    },
  ],
  author: "Zogarth",
  rank: "B",
  following: true,
  externalTags: [
    "LitRPG",
    "Progression",
    "Anti-Hero Lead",
    "Kingdom Building",
    "Psychological",
    "Action",
    "Adventure",
    "Fantasy",
    "GameLit",
    "High Fantasy",
    "Magic",
    "Male Lead",
    "Mythos",
    "Strong Lead",
    "Supernatural",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
