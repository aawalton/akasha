import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerParisAcoustic = {
  id: "01a0676a-d726-705f-92a8-8789981334fb",
  type: "page-type/release",
  slug: "jada-facer-paris-acoustic",
  title: "Paris (Acoustic)",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 1.844433,
  ownProgress: 1.844433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-02-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "71aEYEZj5plcn9iFbDi6pe",
      externalLink: "https://open.spotify.com/album/71aEYEZj5plcn9iFbDi6pe",
    },
  ],
} as const satisfies Release
