import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoIWillAlwaysLoveYou = {
  id: "01a0afa1-c08c-77a7-90b7-37970768aedf",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-i-will-always-love-you",
  ownLength: 3.140833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58fyf25PDHSVGY0ZI4EEWv",
      externalLink: "https://open.spotify.com/track/58fyf25PDHSVGY0ZI4EEWv",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Will Always Love You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "iwillalwaysloveyou|0jW6R8CVyVohuUJVcuweDI|188450",
  song: "song/the-piano-guys-i-will-always-love-you",
} as const satisfies Track
