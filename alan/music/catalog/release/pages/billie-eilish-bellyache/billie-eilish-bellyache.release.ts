import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishBellyache = {
  id: "01a0676a-d718-703c-85ca-98a457b2725f",
  type: "page-type/release",
  slug: "billie-eilish-bellyache",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-02-24",
  grade: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25FGyvj0UnD6YYWLq0s9nl",
      externalLink: "https://open.spotify.com/album/25FGyvj0UnD6YYWLq0s9nl",
    },
  ],
  title: "Bellyache",
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
