import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyChopsticksLullaby = {
  id: "01a0afa1-dd86-7b30-a1ca-3fa3d57af54c",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-chopsticks-lullaby",
  ownLength: 3.7903,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1eAhoZnCqxk1sQpptsJWAT",
      externalLink: "https://open.spotify.com/track/1eAhoZnCqxk1sQpptsJWAT",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Chopsticks Lullaby",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "chopstickslullaby|0jW6R8CVyVohuUJVcuweDI|227418",
  song: "song/the-piano-guys-chopsticks-lullaby",
} as const satisfies Track
