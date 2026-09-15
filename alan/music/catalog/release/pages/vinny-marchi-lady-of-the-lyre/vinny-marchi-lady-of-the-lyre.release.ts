import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiLadyOfTheLyre = {
  id: "01a0676a-d722-7058-8e7d-9039a5d9c7c8",
  type: "page-type/release",
  slug: "vinny-marchi-lady-of-the-lyre",
  title: "Lady of the Lyre",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 2.6,
  ownProgress: 2.6,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-06-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6JOX9lhzhcfjs48rFnheit",
      externalLink: "https://open.spotify.com/album/6JOX9lhzhcfjs48rFnheit",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
