import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const journeyToVeresavirFantasyLitrpg = {
  id: "01a0657d-ada3-7657-9e6e-06f125c86bcb",
  type: "page-type/story-read",
  slug: "journey-to-veresavir-fantasy-litrpg",
  title: "Journey to Veresavir [Fantasy LitRPG]",
  world: "world/journey-to-veresavir-fantasy-litrpg",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "137228",
      externalLink: "https://www.royalroad.com/fiction/137228/journey-to-veresavir-fantasy-litrpg",
    },
  ],
  author: "Rhaegar",
  publicationStatus: "ongoing",
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Magic",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
