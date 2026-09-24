import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangTonight = {
  id: "01a0d52b-52db-77bb-b330-0faa42d29381",
  type: "page-type/track",
  slug: "rockapella-bang-tonight",
  ownLength: 2.804683333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
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
} as const satisfies Track
