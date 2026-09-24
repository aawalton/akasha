import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1Despacito = {
  id: "01a0d52b-52dd-71c3-82a2-e46a83d3bc3d",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-despacito",
  ownLength: 1.2998,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Despacito",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "despacito|1AFSUleuDTapVhm5zUf4ix|77988",
  song: "song/rockapella-despacito",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 8,
      externalId: "0iBdNjtUEwFjj8tZBq6B9j",
      externalLink: "https://open.spotify.com/track/0iBdNjtUEwFjj8tZBq6B9j",
    },
  ],
} as const satisfies Track
