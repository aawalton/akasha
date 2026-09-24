import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3MoreThanWordsMoreThanWords = {
  id: "01a0afa2-1f34-7afc-a3b8-e86b8dc51602",
  type: "page-type/track",
  slug: "the-piano-guys-3-more-than-words-more-than-words",
  ownLength: 3.9313333333333333,
  ownProgress: 3.9313333333333333,
  partOfCollections: ["release/the-piano-guys-3-more-than-words"],
  status: "completed",
  unit: "unit/minutes",
  title: "More Than Words",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Johann Sebastian Bach" },
    { artistName: "Nuno Bettencourt" },
    { artistName: "Gary Cherone" },
    { artist: "artist/the-piano-guys" },
  ],
  trackKey:
    "morethanwords|0jW6R8CVyVohuUJVcuweDI,3konlNIREmuxZRIFKSPKmK,5aIqB5nVVvmFsvSdExz408,703RcPLoxfMOHihd6uJxSd|235880",
  song: "song/the-piano-guys-more-than-words",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-more-than-words",
      discNumber: 1,
      position: 1,
      externalId: "0zwXHa7rZ5RhPJcF1QyX3o",
      externalLink: "https://open.spotify.com/track/0zwXHa7rZ5RhPJcF1QyX3o",
    },
  ],
} as const satisfies Track
