import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinJennyComeAway = {
  id: "01a0d52b-52df-7a0f-b488-12db2b12c38d",
  type: "page-type/track",
  slug: "rockapella-smilin-jenny-come-away",
  ownLength: 3.048,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-smilin"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Jenny Come Away",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "jennycomeaway|1AFSUleuDTapVhm5zUf4ix|182880",
  song: "song/rockapella-jenny-come-away",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 11,
      externalId: "5HSQbLDewARwojbUWGaTeQ",
      externalLink: "https://open.spotify.com/track/5HSQbLDewARwojbUWGaTeQ",
    },
  ],
} as const satisfies Track
