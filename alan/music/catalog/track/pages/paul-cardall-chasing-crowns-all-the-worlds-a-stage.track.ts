import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsAllTheWorldsAStage = {
  id: "01a0b4c8-2100-762d-8a19-a20af3995cfc",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-all-the-worlds-a-stage",
  ownLength: 2.6409666666666665,
  ownProgress: 2.6409666666666665,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "All The World's A Stage",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "alltheworldsastage|7FQRbf8gbKw8KZQZAJWxH2|158458",
  song: "song/paul-cardall-all-the-worlds-a-stage",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 4,
      externalId: "4dZUIaLH3L2LHsbcWekTEE",
      externalLink: "https://open.spotify.com/track/4dZUIaLH3L2LHsbcWekTEE",
    },
  ],
} as const satisfies Track
