import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const reneeRappBiteMe = {
  id: "01a0676a-d719-700e-b7f6-18fc9fe0d5b7",
  type: "page-type/release",
  slug: "renee-rapp-bite-me",
  grade: "C",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/renee-rapp"],
  position: 0,
  publishedAt: "2025-08-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ULnaZahd0zTGVUBVQO6mN",
      externalLink: "https://open.spotify.com/album/6ULnaZahd0zTGVUBVQO6mN",
    },
  ],
  title: "BITE ME",
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-22T20:00:29.000Z",
} as const satisfies Release
