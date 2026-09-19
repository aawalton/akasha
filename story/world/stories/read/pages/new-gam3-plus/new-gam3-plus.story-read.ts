import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const newGam3Plus = {
  id: "01a0657d-ada4-7388-bfc4-edff5af4d4c1",
  type: "page-type/story-read",
  slug: "new-gam3-plus",
  title: "New Gam3 Plus",
  world: "world/new-gam3-plus",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "45382",
      externalLink: "https://www.royalroad.com/fiction/45382/new-gam3-plus",
    },
  ],
  author: "Ephemerality",
  following: true,
  externalTags: [
    "Virtual Reality",
    "Progression",
    "Sci-fi",
    "Action",
    "Adventure",
    "Fantasy",
    "Artificial Intelligence",
    "Cyberpunk",
    "GameLit",
    "LitRPG",
    "Technologically Engineered",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
