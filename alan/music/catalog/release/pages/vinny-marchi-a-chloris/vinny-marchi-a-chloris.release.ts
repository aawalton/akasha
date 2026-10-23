import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiAChloris = {
  id: "01a1690d-9297-7b5d-ad4c-93b31c9f573f",
  type: "page-type/release",
  slug: "vinny-marchi-a-chloris",
  ownLength: 2.9999833333333332,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2026-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ZyoShWs2jSXD6LmS4i7CW",
      externalLink: "https://open.spotify.com/album/4ZyoShWs2jSXD6LmS4i7CW",
      lastSyncedAt: "2026-10-23",
    },
  ],
  title: "À Chloris",
  createdAt: "2026-10-23T13:57:39.606Z",
  updatedAt: "2026-10-23T13:57:39.606Z",
} as const satisfies Release
