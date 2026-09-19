import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodTheCelloSong = {
  id: "01a0afa2-1b46-7591-b1ce-af0cca3c3c89",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-the-cello-song",
  ownLength: 3.2651,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7aqaMGwHRSqmBUr0zIAyuP",
      externalLink: "https://open.spotify.com/track/7aqaMGwHRSqmBUr0zIAyuP",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Cello Song",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thecellosong|0jW6R8CVyVohuUJVcuweDI|195906",
  song: "song/the-piano-guys-the-cello-song",
} as const satisfies Track
