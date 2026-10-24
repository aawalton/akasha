import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const moreThanHumanScifiLitrpg = {
  id: "01a16b61-65e6-7511-835c-42ff401b0cd9",
  type: "page-type/story-read",
  slug: "more-than-human-scifi-litrpg",
  author: "Acrinoe",
  following: false,
  unit: "unit/words",
  title: "More than Human [SciFi LitRPG]",
  world: "world/more-than-human-scifi-litrpg",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "70640",
      externalLink: "https://www.royalroad.com/fiction/70640/more-than-human-scifi-litrpg",
    },
  ],
  externalTags: [
    "Multiple Lead Characters",
    "Sci-fi",
    "Adventure",
    "Artificial Intelligence",
    "Non-Human Lead",
    "Technologically Engineered",
  ],
  publicationStatus: "completed",
  readLater: true,
  createdAt: "2026-10-24T00:48:27.622Z",
  updatedAt: "2026-10-24T00:48:27.622Z",
} as const satisfies StoryRead
