import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkPapercutsInstrumentals = {
  id: "01a0676a-d726-705a-aa62-70d2fc038c89",
  type: "page-type/release",
  slug: "linkin-park-papercuts-instrumentals",
  title: "Papercuts: Instrumentals",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 67.873667,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-06-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "494aUGKXMH5ruXtR3O1a3H",
      externalLink: "https://open.spotify.com/album/494aUGKXMH5ruXtR3O1a3H",
    },
  ],
} as const satisfies Release
