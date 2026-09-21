import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyBestOf2022 = {
  id: "01a0676a-d718-7044-bfd8-d7e560767633",
  type: "page-type/release",
  slug: "the-holderness-family-best-of-2022",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2023-01-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KDOeB7js8yCDMXNfZLdE6",
      externalLink: "https://open.spotify.com/album/6KDOeB7js8yCDMXNfZLdE6",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Best of 2022",
} as const satisfies Release
