import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeGoodAsHellFeatArianaGrandeRemix = {
  id: "01a0676a-d71f-701b-9186-3da3220b9b09",
  type: "page-type/release",
  slug: "ariana-grande-good-as-hell-feat-ariana-grande-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2016-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1k1HuvFs562Z3CCiSYhtc1",
      externalLink: "https://open.spotify.com/album/1k1HuvFs562Z3CCiSYhtc1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Good as Hell (feat. Ariana Grande) [Remix]",
} as const satisfies Release
