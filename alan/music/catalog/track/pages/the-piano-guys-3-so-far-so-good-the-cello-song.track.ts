import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodTheCelloSong = {
  id: "01a0afa2-1b46-7591-b1ce-af0cca3c3c89",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-the-cello-song",
  ownLength: 3.2651,
  ownProgress: 3.2651,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Cello Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thecellosong|0jW6R8CVyVohuUJVcuweDI|195906",
  song: "song/the-piano-guys-the-cello-song",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 4,
      externalId: "7aqaMGwHRSqmBUr0zIAyuP",
      externalLink: "https://open.spotify.com/track/7aqaMGwHRSqmBUr0zIAyuP",
    },
  ],
} as const satisfies Track
