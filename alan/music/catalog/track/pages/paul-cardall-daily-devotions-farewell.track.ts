import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsFarewell = {
  id: "01a0b4c8-5cd8-7a0a-8ceb-d2f98fdc21e3",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-farewell",
  ownLength: 3.96755,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "79HD98hiqx1Wtao2dyfdTr",
      externalLink: "https://open.spotify.com/track/79HD98hiqx1Wtao2dyfdTr",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Farewell",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "farewell|7FQRbf8gbKw8KZQZAJWxH2|238053",
} as const satisfies Track
