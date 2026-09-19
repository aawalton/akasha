import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const riseOfTheLivingForge = {
  id: "01a0657d-ada4-74da-a446-a75e77410fd0",
  type: "page-type/story-read",
  slug: "rise-of-the-living-forge",
  title: "Rise of the Living Forge",
  world: "world/rise-of-the-living-forge",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "79094",
      externalLink: "https://www.royalroad.com/fiction/79094/rise-of-the-living-forge",
    },
  ],
  author: "Actus",
  rank: "B",
  following: true,
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Martial Arts",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Mystery",
    "GameLit",
    "Magic",
    "Secret Identity",
    "Strong Lead",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
