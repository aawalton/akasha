import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyChopsticksLullaby = {
  id: "01a0afa1-dd86-7b30-a1ca-3fa3d57af54c",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-chopsticks-lullaby",
  ownLength: 3.7903,
  ownProgress: 3.7903,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Chopsticks Lullaby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "chopstickslullaby|0jW6R8CVyVohuUJVcuweDI|227418",
  song: "song/the-piano-guys-chopsticks-lullaby",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 3,
      externalId: "1eAhoZnCqxk1sQpptsJWAT",
      externalLink: "https://open.spotify.com/track/1eAhoZnCqxk1sQpptsJWAT",
    },
  ],
} as const satisfies Track
