import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2ThisIsntLove = {
  id: "01a0d52b-52db-7e63-883c-df29329f7fe5",
  type: "page-type/track",
  slug: "rockapella-2-this-isnt-love",
  ownLength: 3.01395,
  ownProgress: 3.01395,
  partOfCollections: ["release/rockapella-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "This Isn't Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "thisisntlove|1AFSUleuDTapVhm5zUf4ix|180837",
  song: "song/rockapella-this-isnt-love",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 4,
      externalId: "2QHPYHgjJBULbO2g0z0O5M",
      externalLink: "https://open.spotify.com/track/2QHPYHgjJBULbO2g0z0O5M",
    },
  ],
} as const satisfies Track
