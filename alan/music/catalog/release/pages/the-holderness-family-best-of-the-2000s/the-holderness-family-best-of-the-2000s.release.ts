import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000s = {
  id: "01a0676a-d718-7047-abea-631063e348e6",
  type: "page-type/release",
  slug: "the-holderness-family-best-of-the-2000s",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2021-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kvDpznALdCW8YzJ5gFlHc",
      externalLink: "https://open.spotify.com/album/4kvDpznALdCW8YzJ5gFlHc",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Best of the 2000s",
} as const satisfies Release
