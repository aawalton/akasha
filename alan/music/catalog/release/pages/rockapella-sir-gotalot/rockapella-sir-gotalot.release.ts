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
} as const satisfies Release
