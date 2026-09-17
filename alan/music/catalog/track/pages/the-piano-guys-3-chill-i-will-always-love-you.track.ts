import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillIWillAlwaysLoveYou = {
  id: "01a0afa1-e116-7ea9-9d45-c890b6376b59",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-i-will-always-love-you",
  ownLength: 3.140833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5qlnkOSg4oT0iCVNJQQqSU",
      externalLink: "https://open.spotify.com/track/5qlnkOSg4oT0iCVNJQQqSU",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Will Always Love You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "iwillalwaysloveyou|0jW6R8CVyVohuUJVcuweDI|188450",
} as const satisfies Track
