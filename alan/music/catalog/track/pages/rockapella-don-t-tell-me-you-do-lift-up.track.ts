import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoLiftUp = {
  id: "01a0d52b-52dd-7184-b2eb-e6ab6bf8cd67",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-lift-up",
  ownLength: 3.5933333333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Lift Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "liftup|1AFSUleuDTapVhm5zUf4ix|215600",
  song: "song/rockapella-lift-up",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 13,
      externalId: "7cDjRUPAcLQMWZXXYHo4Tz",
      externalLink: "https://open.spotify.com/track/7cDjRUPAcLQMWZXXYHo4Tz",
    },
  ],
} as const satisfies Track
