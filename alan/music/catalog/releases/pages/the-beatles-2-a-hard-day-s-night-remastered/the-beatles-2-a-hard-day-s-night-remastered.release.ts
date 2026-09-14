import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const theBeatles2AHardDaySNightRemastered = {
  id: "01a0676a-d715-7028-a8c5-161e44311eca",
  type: "release",
  slug: "the-beatles-2-a-hard-day-s-night-remastered",
  title: "A Hard Day's Night (Remastered)",
  partOfCollections: ["the-beatles"],
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
} as const satisfies Release
