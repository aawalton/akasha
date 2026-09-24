import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsComeComeYeSaints = {
  id: "01a0b4c8-6434-7daa-9c33-676db469e445",
  type: "page-type/track",
  slug: "paul-cardall-hymns-come-come-ye-saints",
  ownLength: 4.173333333333333,
  ownProgress: 4.173333333333333,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Come, Come Ye Saints",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "comecomeyesaints|7FQRbf8gbKw8KZQZAJWxH2|250400",
  song: "song/paul-cardall-come-come-ye-saints",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 14,
      externalId: "7q8oa4YYFYCxVa6gKNj2tU",
      externalLink: "https://open.spotify.com/track/7q8oa4YYFYCxVa6gKNj2tU",
    },
  ],
} as const satisfies Track
