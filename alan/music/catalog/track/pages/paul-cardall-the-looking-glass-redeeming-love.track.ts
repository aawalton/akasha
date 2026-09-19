import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassRedeemingLove = {
  id: "01a0b4c8-620c-7b25-89db-cf00e671fe9d",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-redeeming-love",
  ownLength: 4.336666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1lPQTXNCMSEufL5Bk6hJ2z",
      externalLink: "https://open.spotify.com/track/1lPQTXNCMSEufL5Bk6hJ2z",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Redeeming Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "redeeminglove|7FQRbf8gbKw8KZQZAJWxH2|260200",
  song: "song/paul-cardall-redeeming-love",
} as const satisfies Track
