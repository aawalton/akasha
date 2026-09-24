import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsWindsOfChange = {
  id: "01a0b4c8-219f-7fb7-9dd3-45bcc9fd3a47",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-winds-of-change",
  ownLength: 3.6041666666666665,
  ownProgress: 3.6041666666666665,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Winds of Change",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "windsofchange|7FQRbf8gbKw8KZQZAJWxH2|216250",
  song: "song/paul-cardall-winds-of-change",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 8,
      externalId: "78QcjBxEiLVY3FqcY82Exp",
      externalLink: "https://open.spotify.com/track/78QcjBxEiLVY3FqcY82Exp",
    },
  ],
} as const satisfies Track
