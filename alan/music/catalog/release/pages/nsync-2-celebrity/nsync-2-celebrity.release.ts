import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nsync2Celebrity = {
  id: "01a0676a-d71a-700a-94ba-1c40f47fdb1c",
  type: "page-type/release",
  slug: "nsync-2-celebrity",
  title: "Celebrity",
  partOfCollections: ["artist/nsync"],
  position: 0,
  ownLength: 49.769917,
  ownProgress: 49.769917,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2001-07-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7zBue2Vuzg4Z3ncRXaIkJg",
      externalLink: "https://open.spotify.com/album/7zBue2Vuzg4Z3ncRXaIkJg",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
