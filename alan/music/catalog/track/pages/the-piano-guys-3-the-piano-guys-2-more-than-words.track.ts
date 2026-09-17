import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2MoreThanWords = {
  id: "01a0afa2-215d-7e46-8a31-9a70f078f5c7",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-more-than-words",
  ownLength: 3.9375,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NHT6xEIVlW1lG6oJmoEHF",
      externalLink: "https://open.spotify.com/track/5NHT6xEIVlW1lG6oJmoEHF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "More Than Words",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "morethanwords|0jW6R8CVyVohuUJVcuweDI|236250",
} as const satisfies Track
