import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const lightCleric = {
  id: "01a0657d-ada3-77ee-b67e-e37f1d1f46c2",
  type: "page-type/story-read",
  slug: "light-cleric",
  title: "Light Cleric",
  world: "world/light-cleric",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "38443",
      externalLink: "https://www.royalroad.com/fiction/38443/light-cleric",
    },
  ],
  author: "Ira Creasman",
  following: true,
  publicationStatus: "completed",
  externalTags: [
    "Progression",
    "Female Lead",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
