import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairSweetSeptember = {
  id: "01a0b4c8-6ba0-7dee-a3bb-ce5433395fe1",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-sweet-september",
  ownLength: 3.0182166666666665,
  ownProgress: 3.0182166666666665,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet September",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sweetseptember|7FQRbf8gbKw8KZQZAJWxH2|181093",
  song: "song/paul-cardall-sweet-september",
  carriedBy: [
    {
      release: "release/paul-cardall-scarborough-fair",
      discNumber: 1,
      position: 5,
      externalId: "2bvkc7Jha4yYKzU6o9NUqp",
      externalLink: "https://open.spotify.com/track/2bvkc7Jha4yYKzU6o9NUqp",
    },
  ],
} as const satisfies Track
