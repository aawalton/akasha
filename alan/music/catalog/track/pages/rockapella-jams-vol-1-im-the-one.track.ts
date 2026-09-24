import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1ImTheOne = {
  id: "01a0d52b-52dd-7e0c-b85b-2a5ebf9ec5fc",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-im-the-one",
  ownLength: 1.2978833333333333,
  ownProgress: 1.2978833333333333,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "I'm the One",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "imtheone|1AFSUleuDTapVhm5zUf4ix|77873",
  song: "song/rockapella-im-the-one",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 11,
      externalId: "7bfQifaYN0REdL5svjvmmB",
      externalLink: "https://open.spotify.com/track/7bfQifaYN0REdL5svjvmmB",
    },
  ],
} as const satisfies Track
