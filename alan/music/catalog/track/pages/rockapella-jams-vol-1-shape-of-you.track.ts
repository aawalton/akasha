import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1ShapeOfYou = {
  id: "01a0d52b-52dd-70c9-837a-c9f9701654cb",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-shape-of-you",
  ownLength: 1.3293,
  ownProgress: 1.3293,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shape of You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "shapeofyou|1AFSUleuDTapVhm5zUf4ix|79758",
  song: "song/rockapella-shape-of-you",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 2,
      externalId: "0x3JTSZmA2NNJolPoHzgk7",
      externalLink: "https://open.spotify.com/track/0x3JTSZmA2NNJolPoHzgk7",
    },
  ],
} as const satisfies Track
