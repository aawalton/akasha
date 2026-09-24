import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsColors = {
  id: "01a0b4c8-234a-7bca-82b2-89f16160b023",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-colors",
  ownLength: 4.4,
  ownProgress: 4.4,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Colors",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "colors|7FQRbf8gbKw8KZQZAJWxH2|264000",
  song: "song/paul-cardall-colors",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 19,
      externalId: "68S8a6Se88ncgPP9ssKs2x",
      externalLink: "https://open.spotify.com/track/68S8a6Se88ncgPP9ssKs2x",
    },
  ],
} as const satisfies Track
