import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeStuckWithU = {
  id: "01a0676a-d72a-7035-8319-f8a61923fdcb",
  type: "page-type/release",
  slug: "ariana-grande-stuck-with-u",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2020-05-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mUdh6YWnUvf0MfklEk1oi",
      externalLink: "https://open.spotify.com/album/5mUdh6YWnUvf0MfklEk1oi",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Stuck with U",
} as const satisfies Release
