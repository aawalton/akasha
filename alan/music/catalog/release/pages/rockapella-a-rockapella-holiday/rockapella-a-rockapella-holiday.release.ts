import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaARockapellaHoliday = {
  id: "01a0676a-d715-703c-b745-ca5c6663683c",
  type: "page-type/release",
  slug: "rockapella-a-rockapella-holiday",
  title: "A Rockapella Holiday",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1WCdcmjKznIqlpGrSzMKWO",
      externalLink: "https://open.spotify.com/album/1WCdcmjKznIqlpGrSzMKWO",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
