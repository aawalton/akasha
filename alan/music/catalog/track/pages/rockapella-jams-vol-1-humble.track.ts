import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1Humble = {
  id: "01a0d52b-52dd-7cf1-aa35-bd87c2f75602",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-humble",
  ownLength: 1.4637666666666667,
  ownProgress: 1.4637666666666667,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Humble",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "humble|1AFSUleuDTapVhm5zUf4ix|87826",
  song: "song/rockapella-humble",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 10,
      externalId: "4SxnK4lxcSFMMhfVHi195K",
      externalLink: "https://open.spotify.com/track/4SxnK4lxcSFMMhfVHi195K",
    },
  ],
} as const satisfies Track
