import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseGreenHill = {
  id: "01a0b4c8-5232-7e88-b567-847f582bff80",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-green-hill",
  ownLength: 3.6584333333333334,
  ownProgress: 3.6584333333333334,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Green Hill",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "greenhill|7FQRbf8gbKw8KZQZAJWxH2|219506",
  song: "song/paul-cardall-green-hill",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 9,
      externalId: "2kGcrMzgmbLLB0z3l2KDqp",
      externalLink: "https://open.spotify.com/track/2kGcrMzgmbLLB0z3l2KDqp",
    },
  ],
} as const satisfies Track
