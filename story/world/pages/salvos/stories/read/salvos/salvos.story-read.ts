import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const salvos = {
  id: "01a0657d-ada4-733e-b20e-77c10f7624b2",
  type: "page-type/story-read",
  slug: "salvos",
  title: "Salvos",
  world: "world/salvos",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "37438",
      externalLink: "https://www.royalroad.com/fiction/37438/salvos",
    },
  ],
  rank: "C",
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Non-Human Lead",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Female Lead",
    "GameLit",
    "High Fantasy",
    "Magic",
  ],
  unit: "unit/words",
} as const satisfies StoryRead
