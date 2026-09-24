import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveSilverBellsLive = {
  id: "01a0d52b-52dc-721b-ba9c-593b8bb4b2a3",
  type: "page-type/track",
  slug: "rockapella-christmas-live-silver-bells-live",
  ownLength: 3.0193333333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Silver Bells - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "silverbellslive|1AFSUleuDTapVhm5zUf4ix|181160",
  song: "song/rockapella-silver-bells",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 3,
      externalId: "02YMun7xi8IztXKERgbcMo",
      externalLink: "https://open.spotify.com/track/02YMun7xi8IztXKERgbcMo",
    },
  ],
} as const satisfies Track
