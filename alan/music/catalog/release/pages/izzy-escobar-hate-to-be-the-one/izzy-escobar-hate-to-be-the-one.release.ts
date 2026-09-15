import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const izzyEscobarHateToBeTheOne = {
  id: "01a0a5ce-2376-7fbc-bbcd-bf22f157695b",
  type: "page-type/release",
  slug: "izzy-escobar-hate-to-be-the-one",
  ownLength: 3.4911,
  ownProgress: 0,
  partOfCollections: ["artist/izzy-escobar"],
  position: 0,
  publishedAt: "2026-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3D1D6EStEZHBBxevQ9epWK",
      externalLink: "https://open.spotify.com/album/3D1D6EStEZHBBxevQ9epWK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hate to Be the One",
} as const satisfies Release
