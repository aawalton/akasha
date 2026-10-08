import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2AHardDaySNightRemastered = {
  id: "01a0676a-d715-7028-a8c5-161e44311eca",
  type: "page-type/release",
  slug: "the-beatles-2-a-hard-day-s-night-remastered",
  title: "A Hard Day's Night (Remastered)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 30.194817,
  ownProgress: 30.194817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1964-07-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6wCttLq0ADzkPgtRnUihLV",
      externalLink: "https://open.spotify.com/album/6wCttLq0ADzkPgtRnUihLV",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-15T16:39:47.000Z",
} as const satisfies Release
