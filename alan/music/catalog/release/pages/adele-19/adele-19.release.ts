import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adele19 = {
  id: "01a0676a-d714-7015-a4ba-51285bc34e0c",
  type: "page-type/release",
  slug: "adele-19",
  title: "19",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-01-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "59ULskOkBMij4zL8pS7mi0",
      externalLink: "https://open.spotify.com/album/59ULskOkBMij4zL8pS7mi0",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
