import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangTheShortestPath = {
  id: "01a0d52b-52db-7db2-bb6d-c19704806039",
  type: "page-type/track",
  slug: "rockapella-bang-the-shortest-path",
  ownLength: 2.9336,
  ownProgress: 2.9336,
  partOfCollections: ["release/rockapella-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Shortest Path",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "theshortestpath|1AFSUleuDTapVhm5zUf4ix|176016",
  song: "song/rockapella-the-shortest-path",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 12,
      externalId: "1NMMQ7o0sFPfBKNHr1aABw",
      externalLink: "https://open.spotify.com/track/1NMMQ7o0sFPfBKNHr1aABw",
    },
  ],
} as const satisfies Track
