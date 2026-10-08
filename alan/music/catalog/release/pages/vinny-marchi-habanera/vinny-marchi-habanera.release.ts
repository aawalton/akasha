import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiHabanera = {
  id: "01a0676a-d71f-7035-be3a-303582ae2178",
  type: "page-type/release",
  slug: "vinny-marchi-habanera",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-04-28",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oJUqrCj1QcxB2cOVUgv91",
      externalLink: "https://open.spotify.com/album/3oJUqrCj1QcxB2cOVUgv91",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Habanera",
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
