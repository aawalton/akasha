import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3MoreThanWordsMoreThanWords = {
  id: "01a0afa2-1f34-7afc-a3b8-e86b8dc51602",
  type: "page-type/track",
  slug: "the-piano-guys-3-more-than-words-more-than-words",
  ownLength: 3.9313333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-more-than-words"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0zwXHa7rZ5RhPJcF1QyX3o",
      externalLink: "https://open.spotify.com/track/0zwXHa7rZ5RhPJcF1QyX3o",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "More Than Words",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5aIqB5nVVvmFsvSdExz408", artistName: "Johann Sebastian Bach" },
    { externalId: "3konlNIREmuxZRIFKSPKmK", artistName: "Nuno Bettencourt" },
    { externalId: "703RcPLoxfMOHihd6uJxSd", artistName: "Gary Cherone" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "morethanwords|0jW6R8CVyVohuUJVcuweDI,3konlNIREmuxZRIFKSPKmK,5aIqB5nVVvmFsvSdExz408,703RcPLoxfMOHihd6uJxSd|235880",
  song: "song/the-piano-guys-more-than-words",
} as const satisfies Track
