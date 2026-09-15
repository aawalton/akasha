import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeThankUNext = {
  id: "01a0676a-d72c-7010-9223-6fe7dc85a469",
  type: "release",
  slug: "ariana-grande-thank-u-next",
  title: "thank u, next",
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  ownLength: 41.17015,
  ownProgress: 41.17015,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-02-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fYhqwDWXjbpjaIJPEfKFw",
      externalLink: "https://open.spotify.com/album/2fYhqwDWXjbpjaIJPEfKFw",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Release
