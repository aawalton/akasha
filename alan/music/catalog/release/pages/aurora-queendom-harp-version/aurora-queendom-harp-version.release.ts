import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraQueendomHarpVersion = {
  id: "01a0676a-d727-703a-a3db-d4efc9f742d9",
  type: "page-type/release",
  slug: "aurora-queendom-harp-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2018-06-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1vmPWNli0hFNGxkIvfVkGw",
      externalLink: "https://open.spotify.com/album/1vmPWNli0hFNGxkIvfVkGw",
    },
  ],
  title: "Queendom (Harp Version)",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
