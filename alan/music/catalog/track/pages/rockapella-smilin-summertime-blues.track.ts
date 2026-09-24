import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinSummertimeBlues = {
  id: "01a0d52b-52df-7b6d-a0de-3f0c5a6841ae",
  type: "page-type/track",
  slug: "rockapella-smilin-summertime-blues",
  ownLength: 3.685766666666667,
  ownProgress: 3.685766666666667,
  partOfCollections: ["release/rockapella-smilin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Summertime Blues",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "summertimeblues|1AFSUleuDTapVhm5zUf4ix|221146",
  song: "song/rockapella-summertime-blues",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 5,
      externalId: "4ulDatJFAMDQk8u6f1YhEO",
      externalLink: "https://open.spotify.com/track/4ulDatJFAMDQk8u6f1YhEO",
    },
  ],
} as const satisfies Track
