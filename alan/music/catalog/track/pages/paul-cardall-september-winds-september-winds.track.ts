import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSeptemberWindsSeptemberWinds = {
  id: "01a0b4c8-69dd-76c2-beff-077e90f70d3c",
  type: "page-type/track",
  slug: "paul-cardall-september-winds-september-winds",
  ownLength: 3.8041666666666667,
  ownProgress: 3.8041666666666667,
  partOfCollections: ["release/paul-cardall-september-winds"],
  status: "completed",
  unit: "unit/minutes",
  title: "September Winds",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "septemberwinds|7FQRbf8gbKw8KZQZAJWxH2|228250",
  song: "song/paul-cardall-september-winds",
  carriedBy: [
    {
      release: "release/paul-cardall-september-winds",
      discNumber: 1,
      position: 1,
      externalId: "1azQ2kty7l8fY41ON2PseU",
      externalLink: "https://open.spotify.com/track/1azQ2kty7l8fY41ON2PseU",
    },
  ],
} as const satisfies Track
