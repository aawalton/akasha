import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallDailyDevotions = {
  id: "01a0676a-d71b-704b-bded-e8ba3a943278",
  type: "page-type/release",
  slug: "paul-cardall-daily-devotions",
  title: "Daily Devotions",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 39.7548,
  ownProgress: 39.7548,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2002-10-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BZn3TJ67Hre0AL1hGAgEm",
      externalLink: "https://open.spotify.com/album/4BZn3TJ67Hre0AL1hGAgEm",
    },
  ],
} as const satisfies Release
