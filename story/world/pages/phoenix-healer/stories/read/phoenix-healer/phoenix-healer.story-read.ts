import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const phoenixHealer = {
  id: "01a0657d-ada4-7230-9158-208883dda232",
  type: "page-type/story-read",
  slug: "phoenix-healer",
  title: "Phoenix Healer",
  world: "world/phoenix-healer",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "96871",
      externalLink: "https://www.royalroad.com/fiction/96871/phoenix-healer",
    },
  ],
  author: "Maeve McCarthy",
  following: true,
  publicationStatus: "hiatus",
  externalTags: ["LitRPG", "Female Lead", "Action", "Adventure", "Fantasy", "Magic"],
  unit: "unit/words",
  prose: "txt",
  createdAt: "2026-09-03T04:18:50.404Z",
  updatedAt: "2026-09-19T12:03:55.000Z",
} as const satisfies StoryRead
