import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsDevotions = {
  id: "01a0b4c8-5de2-76af-b0ab-806a4ff15906",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-devotions",
  ownLength: 2.355766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CevnA3DCMSXggQAahr7Cb",
      externalLink: "https://open.spotify.com/track/2CevnA3DCMSXggQAahr7Cb",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Devotions",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "devotions|7FQRbf8gbKw8KZQZAJWxH2|141346",
  song: "song/paul-cardall-devotions",
} as const satisfies Track
