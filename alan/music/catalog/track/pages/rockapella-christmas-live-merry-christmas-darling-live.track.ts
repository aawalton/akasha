import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveMerryChristmasDarlingLive = {
  id: "01a0d52b-52dc-7f9b-b44c-7c72e7b3ba82",
  type: "page-type/track",
  slug: "rockapella-christmas-live-merry-christmas-darling-live",
  ownLength: 4.8851,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Merry Christmas Darling - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "merrychristmasdarlinglive|1AFSUleuDTapVhm5zUf4ix|293106",
  song: "song/rockapella-merry-christmas-darling",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 7,
      externalId: "1l0NvBPYAmgNBGVxrMtRfn",
      externalLink: "https://open.spotify.com/track/1l0NvBPYAmgNBGVxrMtRfn",
    },
  ],
} as const satisfies Track
