import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalMovieSoundtracksTime = {
  id: "01a0afa1-d3bc-79f3-8bbf-ddf800058e9c",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-movie-soundtracks-time",
  ownLength: 4.2,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-classical-movie-soundtracks"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3dK4Mohu0ZS66L1wZRaQhS",
      externalLink: "https://open.spotify.com/track/3dK4Mohu0ZS66L1wZRaQhS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "time|0jW6R8CVyVohuUJVcuweDI|252000",
  song: "song/the-piano-guys-time",
} as const satisfies Track
