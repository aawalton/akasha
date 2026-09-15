import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonLikeItIs = {
  id: "01a0676a-d723-7034-9205-2e2c6cf31629",
  type: "page-type/release",
  slug: "zara-larsson-like-it-is",
  title: "Like It Is",
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  ownLength: 3.051117,
  ownProgress: 3.051117,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-03-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lWWqdcdtFgSd1j06F9JZC",
      externalLink: "https://open.spotify.com/album/0lWWqdcdtFgSd1j06F9JZC",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Release
