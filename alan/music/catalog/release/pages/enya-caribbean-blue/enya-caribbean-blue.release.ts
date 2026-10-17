import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaCaribbeanBlue = {
  id: "01a0676a-d719-7064-a7c4-9b77a0c21996",
  type: "page-type/release",
  slug: "enya-caribbean-blue",
  title: "Caribbean Blue",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1991-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0drAXE2TkbZhrj2HBB4bOc",
      externalLink: "https://open.spotify.com/album/0drAXE2TkbZhrj2HBB4bOc",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
