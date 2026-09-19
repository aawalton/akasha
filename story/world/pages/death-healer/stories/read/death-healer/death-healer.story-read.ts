import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const deathHealer = {
  id: "01a0657d-ada1-7a83-b7fb-b9855697bae3",
  type: "page-type/story-read",
  slug: "death-healer",
  title: "Death Healer",
  world: "world/death-healer",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "115399",
      externalLink: "https://www.royalroad.com/fiction/115399/death-healer",
    },
  ],
  rank: "C",
  externalTags: [
    "LitRPG",
    "Reincarnation",
    "Progression",
    "Female Lead",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "GameLit",
    "High Fantasy",
    "Magic",
  ],
  ownProgress: 151064,
  unit: "unit/words",
} as const satisfies StoryRead
