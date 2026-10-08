import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiLadyOfTheLyre = {
  id: "01a0676a-d722-7058-8e7d-9039a5d9c7c8",
  type: "page-type/release",
  slug: "vinny-marchi-lady-of-the-lyre",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-06-14",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6JOX9lhzhcfjs48rFnheit",
      externalLink: "https://open.spotify.com/album/6JOX9lhzhcfjs48rFnheit",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Lady of the Lyre",
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
