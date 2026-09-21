import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalMovieSoundtracksLetItGo = {
  id: "01a0afa1-d376-7953-8726-7e8e26785331",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-movie-soundtracks-let-it-go",
  ownLength: 4.0107,
  ownProgress: 4.0107,
  partOfCollections: ["release/the-piano-guys-3-classical-movie-soundtracks"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0XajTLrpinn5abx0IsQyru",
      externalLink: "https://open.spotify.com/track/0XajTLrpinn5abx0IsQyru",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Let It Go",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "letitgo|0jW6R8CVyVohuUJVcuweDI|240642",
  song: "song/the-piano-guys-let-it-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-classical-movie-soundtracks",
      discNumber: 1,
      position: 2,
      externalId: "0XajTLrpinn5abx0IsQyru",
      externalLink: "https://open.spotify.com/track/0XajTLrpinn5abx0IsQyru",
    },
  ],
} as const satisfies Track
