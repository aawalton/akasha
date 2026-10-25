import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const grandArcana = {
  id: "01a17419-696b-773f-ab3d-430fa4f50509",
  type: "page-type/story-read",
  slug: "grand-arcana",
  author: "Lise Eclaire",
  following: false,
  unit: "unit/words",
  title: "Grand Arcana",
  world: "world/grand-arcana",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "182721",
      externalLink: "https://www.royalroad.com/fiction/182721/grand-arcana",
    },
  ],
  externalTags: [
    "LitRPG",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Mystery",
    "Deck Building",
  ],
  publicationStatus: "ongoing",
  readLater: true,
  createdAt: "2026-10-25T17:26:24.874Z",
  updatedAt: "2026-10-25T17:26:24.874Z",
} as const satisfies StoryRead
