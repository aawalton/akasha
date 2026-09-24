import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveHopeWeHoldLive = {
  id: "01a0d52b-52dc-7841-b2b6-8bed12b001cd",
  type: "page-type/track",
  slug: "rockapella-christmas-live-hope-we-hold-live",
  ownLength: 3.3297666666666665,
  ownProgress: 3.3297666666666665,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hope We Hold - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "hopeweholdlive|1AFSUleuDTapVhm5zUf4ix|199786",
  song: "song/rockapella-hope-we-hold",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 1,
      externalId: "73HDcn25ZG0dVuSAJBt95b",
      externalLink: "https://open.spotify.com/track/73HDcn25ZG0dVuSAJBt95b",
    },
  ],
} as const satisfies Track
