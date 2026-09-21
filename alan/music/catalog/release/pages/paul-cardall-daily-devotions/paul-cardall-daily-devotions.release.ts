import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallDailyDevotions = {
  id: "01a0676a-d71b-704b-bded-e8ba3a943278",
  type: "page-type/release",
  slug: "paul-cardall-daily-devotions",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2002-10-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BZn3TJ67Hre0AL1hGAgEm",
      externalLink: "https://open.spotify.com/album/4BZn3TJ67Hre0AL1hGAgEm",
    },
  ],
  title: "Daily Devotions",
} as const satisfies Release
