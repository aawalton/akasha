import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLivePleaseComeHomeForChristmasLive = {
  id: "01a0d52b-52dc-78bc-aef0-516e57b6101f",
  type: "page-type/track",
  slug: "rockapella-christmas-live-please-come-home-for-christmas-live",
  ownLength: 4.109333333333334,
  ownProgress: 4.109333333333334,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Please Come Home for Christmas - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "pleasecomehomeforchristmaslive|1AFSUleuDTapVhm5zUf4ix|246560",
  song: "song/rockapella-please-come-home-for-christmas",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 10,
      externalId: "7hx1qieooEtvAqx0XV3Nq4",
      externalLink: "https://open.spotify.com/track/7hx1qieooEtvAqx0XV3Nq4",
    },
  ],
} as const satisfies Track
