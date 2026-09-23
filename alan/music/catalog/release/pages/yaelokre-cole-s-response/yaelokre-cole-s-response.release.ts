import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreColeSResponse = {
  id: "01a0676a-d71b-700e-b71d-04c9fddaeeb5",
  type: "page-type/release",
  slug: "yaelokre-cole-s-response",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2025-05-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3c9v4CNoqLy1h3x8nlM5vP",
      externalLink: "https://open.spotify.com/album/3c9v4CNoqLy1h3x8nlM5vP",
    },
  ],
  title: "Cole's Response",
} as const satisfies Release
