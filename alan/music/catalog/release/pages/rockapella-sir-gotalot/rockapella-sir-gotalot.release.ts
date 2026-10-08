import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaSirGotalot = {
  id: "01a0676a-d729-7011-8266-7e1e4b74f0bf",
  type: "page-type/release",
  slug: "rockapella-sir-gotalot",
  title: "Sir GotALot",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-07-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Tr7A4kCojvq0AEcJWmTEb",
      externalLink: "https://open.spotify.com/album/0Tr7A4kCojvq0AEcJWmTEb",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
