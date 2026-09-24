import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaCandyManCandyMan = {
  id: "01a0d52b-52db-7fcc-be70-d0a42a87d2b1",
  type: "page-type/track",
  slug: "rockapella-candy-man-candy-man",
  ownLength: 2.5947833333333334,
  ownProgress: 2.5947833333333334,
  partOfCollections: ["release/rockapella-candy-man"],
  status: "completed",
  unit: "unit/minutes",
  title: "Candy Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "candyman|1AFSUleuDTapVhm5zUf4ix|155687",
  song: "song/rockapella-candy-man",
  carriedBy: [
    {
      release: "release/rockapella-candy-man",
      discNumber: 1,
      position: 1,
      externalId: "7855QYCTFALPvTk6FqeIhM",
      externalLink: "https://open.spotify.com/track/7855QYCTFALPvTk6FqeIhM",
    },
  ],
} as const satisfies Track
