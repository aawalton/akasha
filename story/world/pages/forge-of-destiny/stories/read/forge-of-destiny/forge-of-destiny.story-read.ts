import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const forgeOfDestiny = {
  id: "01a0657d-ada2-78c7-aa02-6301de124020",
  type: "page-type/story-read",
  slug: "forge-of-destiny",
  title: "Forge of Destiny",
  world: "world/forge-of-destiny",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "21188",
      externalLink: "https://www.royalroad.com/fiction/21188/forge-of-destiny",
    },
  ],
  rank: "C",
  externalTags: [
    "Cultivation",
    "Female Lead",
    "Slice of Life",
    "Drama",
    "Action",
    "Adventure",
    "Fantasy",
    "Magic",
    "Martial Arts",
  ],
  ownProgress: 1264154,
  unit: "unit/words",
} as const satisfies StoryRead
