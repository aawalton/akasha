import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsDayOfRest = {
  id: "01a0b4c8-63cf-7020-8df9-f593bd8dccb8",
  type: "page-type/track",
  slug: "paul-cardall-hymns-day-of-rest",
  ownLength: 2.624433333333333,
  ownProgress: 2.624433333333333,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Day Of Rest",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "dayofrest|7FQRbf8gbKw8KZQZAJWxH2|157466",
  song: "song/paul-cardall-day-of-rest",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 11,
      externalId: "49Sb1o9kyyJLrfaXCzq2jX",
      externalLink: "https://open.spotify.com/track/49Sb1o9kyyJLrfaXCzq2jX",
    },
  ],
} as const satisfies Track
