import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreMyCherieAmour = {
  id: "01a0d52b-52de-76a1-b81a-d547d9572e13",
  type: "page-type/track",
  slug: "rockapella-motown-more-my-cherie-amour",
  ownLength: 4.0266,
  ownProgress: 4.0266,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Cherie Amour",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "mycherieamour|1AFSUleuDTapVhm5zUf4ix|241596",
  song: "song/rockapella-my-cherie-amour",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 7,
      externalId: "16eq1J2YOWIXjpJPvSyVdy",
      externalLink: "https://open.spotify.com/track/16eq1J2YOWIXjpJPvSyVdy",
    },
  ],
} as const satisfies Track
