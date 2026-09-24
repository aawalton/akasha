import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310LetItGo = {
  id: "01a0afa2-0c50-706c-bf5f-e0982240d935",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-let-it-go",
  ownLength: 4.0107,
  ownProgress: 4.0107,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-movie-soundtracks",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Let It Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "letitgo|0jW6R8CVyVohuUJVcuweDI|240642",
  song: "song/the-piano-guys-let-it-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 4,
      externalId: "7AOfVAuxZ89ProPfA4Ozo3",
      externalLink: "https://open.spotify.com/track/7AOfVAuxZ89ProPfA4Ozo3",
    },
    {
      release: "release/the-piano-guys-3-classical-movie-soundtracks",
      discNumber: 1,
      position: 2,
      externalId: "0XajTLrpinn5abx0IsQyru",
      externalLink: "https://open.spotify.com/track/0XajTLrpinn5abx0IsQyru",
    },
  ],
} as const satisfies Track
