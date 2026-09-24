import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoTheGrowingSeason = {
  id: "01a0b4c8-3204-75eb-8d86-131acab33bc2",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-the-growing-season",
  ownLength: 4.654,
  ownProgress: 4.654,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Growing Season",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thegrowingseason|7FQRbf8gbKw8KZQZAJWxH2|279240",
  song: "song/paul-cardall-the-growing-season",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 6,
      externalId: "55ukNZ9zHGdljRa7aIhipl",
      externalLink: "https://open.spotify.com/track/55ukNZ9zHGdljRa7aIhipl",
    },
  ],
} as const satisfies Track
