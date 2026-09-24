import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveWinterWonderlandLive = {
  id: "01a0d52b-52dc-7a74-8b38-9ac0242cc118",
  type: "page-type/track",
  slug: "rockapella-christmas-live-winter-wonderland-live",
  ownLength: 3.3042166666666666,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Winter Wonderland - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "winterwonderlandlive|1AFSUleuDTapVhm5zUf4ix|198253",
  song: "song/rockapella-winter-wonderland",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 6,
      externalId: "49qQFtJaxsduNyjhsGTCsM",
      externalLink: "https://open.spotify.com/track/49qQFtJaxsduNyjhsGTCsM",
    },
  ],
} as const satisfies Track
