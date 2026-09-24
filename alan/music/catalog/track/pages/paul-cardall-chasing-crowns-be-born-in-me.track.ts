import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsBeBornInMe = {
  id: "01a0b4c8-223c-7fc2-baad-310176b4dd4e",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-be-born-in-me",
  ownLength: 3.6166666666666667,
  ownProgress: 3.6166666666666667,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Be Born In Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "beborninme|7FQRbf8gbKw8KZQZAJWxH2|217000",
  song: "song/paul-cardall-be-born-in-me",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 12,
      externalId: "3wg10xhrSRKJ9R6e9UY5Pj",
      externalLink: "https://open.spotify.com/track/3wg10xhrSRKJ9R6e9UY5Pj",
    },
  ],
} as const satisfies Track
