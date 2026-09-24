import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveRockinAroundTheChristmasTreeLive = {
  id: "01a0d52b-52dc-7f25-be79-dfafd327b9ec",
  type: "page-type/track",
  slug: "rockapella-christmas-live-rockin-around-the-christmas-tree-live",
  ownLength: 3.7931,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Rockin' Around the Christmas Tree - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "rockinaroundthechristmastreelive|1AFSUleuDTapVhm5zUf4ix|227586",
  song: "song/rockapella-rockin-around-the-christmas-tree",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 4,
      externalId: "7k6ZkYtggVXBO3nW6X0ill",
      externalLink: "https://open.spotify.com/track/7k6ZkYtggVXBO3nW6X0ill",
    },
  ],
} as const satisfies Track
