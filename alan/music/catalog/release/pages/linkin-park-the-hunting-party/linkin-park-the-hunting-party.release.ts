import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkTheHuntingParty = {
  id: "01a0676a-d72d-7028-8e7e-9891d6d6c540",
  type: "page-type/release",
  slug: "linkin-park-the-hunting-party",
  title: "The Hunting Party",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 45.280617,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-06-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3XB2yloP7l00tEUmaODtVi",
      externalLink: "https://open.spotify.com/album/3XB2yloP7l00tEUmaODtVi",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
