import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adele30 = {
  id: "01a0676a-d715-7006-9f6a-f287ae9cd8a0",
  type: "page-type/release",
  slug: "adele-30",
  title: "30",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-11-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21jF5jlMtzo94wbxmJ18aa",
      externalLink: "https://open.spotify.com/album/21jF5jlMtzo94wbxmJ18aa",
      lastSyncedAt: "2026-02-09",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
