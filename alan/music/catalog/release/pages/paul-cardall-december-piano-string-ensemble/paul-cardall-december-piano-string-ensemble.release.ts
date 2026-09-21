import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsemble = {
  id: "01a0676a-d71c-7000-ac3a-8f3b7656e086",
  type: "page-type/release",
  slug: "paul-cardall-december-piano-string-ensemble",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2021-12-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gPTqqmN9P8vPNjy7HJP5c",
      externalLink: "https://open.spotify.com/album/7gPTqqmN9P8vPNjy7HJP5c",
    },
  ],
  title: "December (Piano & String Ensemble)",
} as const satisfies Release
