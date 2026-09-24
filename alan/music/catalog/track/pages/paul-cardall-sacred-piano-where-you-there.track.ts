import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoWhereYouThere = {
  id: "01a0b4c8-47f3-7fa4-a832-dde5683cc184",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-where-you-there",
  ownLength: 5.258216666666667,
  ownProgress: 5.258216666666667,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Where You There?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "whereyouthere|7FQRbf8gbKw8KZQZAJWxH2|315493",
  song: "song/paul-cardall-where-you-there",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 9,
      externalId: "6Aa8vLcIfoAJikT1QVrAbY",
      externalLink: "https://open.spotify.com/track/6Aa8vLcIfoAJikT1QVrAbY",
    },
  ],
} as const satisfies Track
