import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassLittleMoreTimeWithYou = {
  id: "01a0abeb-3a22-7726-8870-82d7dc2b38af",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-little-more-time-with-you",
  ownLength: 3.848883333333333,
  ownProgress: 3.848883333333333,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
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
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "littlemoretimewithyou|0vn7UBvSQECKJm2817Yf1P|230933",
  song: "song/james-taylor-little-more-time-with-you",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 3,
      externalId: "2J89bAuhj02USwAr7jyVFV",
      externalLink: "https://open.spotify.com/track/2J89bAuhj02USwAr7jyVFV",
    },
  ],
} as const satisfies Track
