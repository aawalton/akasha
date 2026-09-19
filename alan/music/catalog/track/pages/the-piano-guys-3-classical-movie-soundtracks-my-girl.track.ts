import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalMovieSoundtracksMyGirl = {
  id: "01a0afa1-d48b-7b86-82e5-7c9930a51b16",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-movie-soundtracks-my-girl",
  ownLength: 3.9403,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-classical-movie-soundtracks"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3bcpGqB8A84rKZx6KXI34l",
      externalLink: "https://open.spotify.com/track/3bcpGqB8A84rKZx6KXI34l",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "My Girl",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "mygirl|0jW6R8CVyVohuUJVcuweDI|236418",
  song: "song/the-piano-guys-my-girl",
} as const satisfies Track
