import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangTonight = {
  id: "01a0d52b-52db-77bb-b330-0faa42d29381",
  type: "page-type/track",
  slug: "rockapella-bang-tonight",
  ownLength: 2.804683333333333,
  ownProgress: 2.804683333333333,
  partOfCollections: ["release/rockapella-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tonight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "tonight|1AFSUleuDTapVhm5zUf4ix|168281",
  song: "song/rockapella-tonight",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 7,
      externalId: "4mygz6G3Za31WGug3eWwHx",
      externalLink: "https://open.spotify.com/track/4mygz6G3Za31WGug3eWwHx",
    },
  ],
  createdAt: "2026-09-24T20:46:21.403Z",
  updatedAt: "2026-09-24T21:00:26.000Z",
} as const satisfies Track
