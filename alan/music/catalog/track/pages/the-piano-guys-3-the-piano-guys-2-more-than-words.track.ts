import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2MoreThanWords = {
  id: "01a0afa2-215d-7e46-8a31-9a70f078f5c7",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-more-than-words",
  ownLength: 3.9375,
  ownProgress: 3.9375,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "More Than Words",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "morethanwords|0jW6R8CVyVohuUJVcuweDI|236250",
  song: "song/the-piano-guys-more-than-words",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 12,
      externalId: "5NHT6xEIVlW1lG6oJmoEHF",
      externalLink: "https://open.spotify.com/track/5NHT6xEIVlW1lG6oJmoEHF",
    },
  ],
} as const satisfies Track
