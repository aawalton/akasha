import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayDonTPanic = {
  id: "01a0676a-d71c-7023-9c02-9f6e5b8f51f9",
  type: "page-type/release",
  slug: "coldplay-don-t-panic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2001-03-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "36Z4YfJRuw3r2VeHgNQbrF",
      externalLink: "https://open.spotify.com/album/36Z4YfJRuw3r2VeHgNQbrF",
    },
  ],
  title: "Don't Panic",
} as const satisfies Release
