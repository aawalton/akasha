import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinShambala = {
  id: "01a0d52b-52df-71f0-a692-28a53b0d0c65",
  type: "page-type/track",
  slug: "rockapella-smilin-shambala",
  ownLength: 2.786383333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-smilin"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Shambala",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "shambala|1AFSUleuDTapVhm5zUf4ix|167183",
  song: "song/rockapella-shambala",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 1,
      externalId: "5hPzBL4s6vjt29QseYhYCr",
      externalLink: "https://open.spotify.com/track/5hPzBL4s6vjt29QseYhYCr",
    },
  ],
} as const satisfies Track
