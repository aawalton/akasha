import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassLittleMoreTimeWithYou = {
  id: "01a0abeb-3a22-7726-8870-82d7dc2b38af",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-little-more-time-with-you",
  ownLength: 3.848883333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2J89bAuhj02USwAr7jyVFV",
      externalLink: "https://open.spotify.com/track/2J89bAuhj02USwAr7jyVFV",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Little More Time with You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "littlemoretimewithyou|0vn7UBvSQECKJm2817Yf1P|230933",
  song: "song/james-taylor-little-more-time-with-you",
} as const satisfies Track
