import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipReverentlyQuietly = {
  id: "01a0b4c8-56fa-7a61-8539-bb3136c531ae",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-reverently-quietly",
  ownLength: 3.15355,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "626e9Py1Awti5VQYrGW7WO",
      externalLink: "https://open.spotify.com/track/626e9Py1Awti5VQYrGW7WO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Reverently Quietly",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "reverentlyquietly|7FQRbf8gbKw8KZQZAJWxH2|189213",
  song: "song/paul-cardall-reverently-quietly",
} as const satisfies Track
