import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseGrateful = {
  id: "01a0b4c8-5149-707b-aa3e-31547d6198c4",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-grateful",
  ownLength: 3.744666666666667,
  ownProgress: 3.744666666666667,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Grateful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "grateful|7FQRbf8gbKw8KZQZAJWxH2|224680",
  song: "song/paul-cardall-grateful",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 3,
      externalId: "2lTJwqxbJDkxdR2HEoeKjj",
      externalLink: "https://open.spotify.com/track/2lTJwqxbJDkxdR2HEoeKjj",
    },
  ],
} as const satisfies Track
