import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoEllieMyLove = {
  id: "01a0d52b-52dd-7a44-bdf9-bd860c09d42c",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-ellie-my-love",
  ownLength: 3.5208833333333334,
  ownProgress: 3.5208833333333334,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ellie My Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "elliemylove|1AFSUleuDTapVhm5zUf4ix|211253",
  song: "song/rockapella-ellie-my-love",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 12,
      externalId: "47nPmGjmrKU5cNVaxuVQ1Y",
      externalLink: "https://open.spotify.com/track/47nPmGjmrKU5cNVaxuVQ1Y",
    },
  ],
} as const satisfies Track
