import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveSugarPlumBreakdownLive = {
  id: "01a0d52b-52dc-70c0-a66e-66cf36f74356",
  type: "page-type/track",
  slug: "rockapella-christmas-live-sugar-plum-breakdown-live",
  ownLength: 1.7444333333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sugar Plum Breakdown - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "sugarplumbreakdownlive|1AFSUleuDTapVhm5zUf4ix|104666",
  song: "song/rockapella-sugar-plum-breakdown",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 12,
      externalId: "6sPyQQCDwVn2k811yons5G",
      externalLink: "https://open.spotify.com/track/6sPyQQCDwVn2k811yons5G",
    },
  ],
} as const satisfies Track
