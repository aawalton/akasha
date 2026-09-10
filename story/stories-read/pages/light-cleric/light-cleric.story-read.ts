import type { StoryRead } from "../../story-read.page-type.types.ts"

export const lightCleric = {
  id: "01a0657d-ada3-77ee-b67e-e37f1d1f46c2",
  pageTypeSlug: "story-read",
  type: "story-read",
  slug: "light-cleric",
  title: "Light Cleric",
  world: "light-cleric",
  source: "royal-road",
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
  unit: "words",
  externalLink: "https://www.royalroad.com/fiction/38443/light-cleric",
  externalId: "38443",
  prose: "txt",
} as const satisfies StoryRead
