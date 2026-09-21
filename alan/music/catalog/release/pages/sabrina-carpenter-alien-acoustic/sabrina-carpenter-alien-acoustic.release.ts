import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterAlienAcoustic = {
  id: "01a0676a-d716-7012-a532-d460dbb5bfbc",
  type: "page-type/release",
  slug: "sabrina-carpenter-alien-acoustic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2018-05-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6lA3p7IHcwFXjdy08QkGWS",
      externalLink: "https://open.spotify.com/album/6lA3p7IHcwFXjdy08QkGWS",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Alien (Acoustic)",
} as const satisfies Release
