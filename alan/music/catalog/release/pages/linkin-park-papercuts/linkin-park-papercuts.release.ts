import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkPapercuts = {
  id: "01a0676a-d726-7059-8286-b796be12f617",
  type: "page-type/release",
  slug: "linkin-park-papercuts",
  title: "Papercuts",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 67.902917,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-04-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1X472EvsSqH09RyrqbtyXU",
      externalLink: "https://open.spotify.com/album/1X472EvsSqH09RyrqbtyXU",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
