import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreMyGirl = {
  id: "01a0d52b-52de-712d-814f-ca146c3c0f0a",
  type: "page-type/track",
  slug: "rockapella-motown-more-my-girl",
  ownLength: 2.1835,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "My Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "mygirl|1AFSUleuDTapVhm5zUf4ix|131010",
  song: "song/rockapella-my-girl",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 10,
      externalId: "24pmMYYnzOW7gwdUrrMRbu",
      externalLink: "https://open.spotify.com/track/24pmMYYnzOW7gwdUrrMRbu",
    },
  ],
} as const satisfies Track
