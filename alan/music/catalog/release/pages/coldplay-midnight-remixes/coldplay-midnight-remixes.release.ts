import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMidnightRemixes = {
  id: "01a0676a-d724-7060-b8dd-7bf28a99f787",
  type: "page-type/release",
  slug: "coldplay-midnight-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-05-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nh0bp0UH6N9mxlRRZhn3O",
      externalLink: "https://open.spotify.com/album/0nh0bp0UH6N9mxlRRZhn3O",
    },
  ],
  title: "Midnight (Remixes)",
} as const satisfies Release
