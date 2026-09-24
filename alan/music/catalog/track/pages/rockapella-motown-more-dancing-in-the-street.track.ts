import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreDancingInTheStreet = {
  id: "01a0d52b-52de-7a72-abcc-f84a96ff92db",
  type: "page-type/track",
  slug: "rockapella-motown-more-dancing-in-the-street",
  ownLength: 2.7677833333333335,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Dancing in the Street",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "dancinginthestreet|1AFSUleuDTapVhm5zUf4ix|166067",
  song: "song/rockapella-dancing-in-the-street",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 8,
      externalId: "44zZNYbo6g284aVa9CDgQp",
      externalLink: "https://open.spotify.com/track/44zZNYbo6g284aVa9CDgQp",
    },
  ],
} as const satisfies Track
