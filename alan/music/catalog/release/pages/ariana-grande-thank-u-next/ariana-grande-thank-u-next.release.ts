import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeThankUNext = {
  id: "01a0676a-d72c-7010-9223-6fe7dc85a469",
  type: "page-type/release",
  slug: "ariana-grande-thank-u-next",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2019-02-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fYhqwDWXjbpjaIJPEfKFw",
      externalLink: "https://open.spotify.com/album/2fYhqwDWXjbpjaIJPEfKFw",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "thank u, next",
} as const satisfies Release
