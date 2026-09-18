import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysINeedTheeEveryHour = {
  id: "01a0b4c8-3bf7-716f-a148-2bd6b64b9e91",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-i-need-thee-every-hour",
  ownLength: 2.3111,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  position: 36,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2dydT7x55vYcYauQgEnrPo",
      externalLink: "https://open.spotify.com/track/2dydT7x55vYcYauQgEnrPo",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Need Thee Every Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ineedtheeeveryhour|7FQRbf8gbKw8KZQZAJWxH2|138666",
} as const satisfies Track
