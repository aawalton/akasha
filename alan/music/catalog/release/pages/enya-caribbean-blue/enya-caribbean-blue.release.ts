import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaCaribbeanBlue = {
  id: "01a0676a-d719-7064-a7c4-9b77a0c21996",
  type: "release",
  slug: "enya-caribbean-blue",
  title: "Caribbean Blue",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 10.518217,
  ownProgress: 10.518217,
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
} as const satisfies Release
