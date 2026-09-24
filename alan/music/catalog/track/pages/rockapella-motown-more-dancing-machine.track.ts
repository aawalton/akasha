import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreDancingMachine = {
  id: "01a0d52b-52de-7472-85c1-47da5c21eaf4",
  type: "page-type/track",
  slug: "rockapella-motown-more-dancing-machine",
  ownLength: 2.7640833333333332,
  ownProgress: 2.7640833333333332,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dancing Machine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "dancingmachine|1AFSUleuDTapVhm5zUf4ix|165845",
  song: "song/rockapella-dancing-machine",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 5,
      externalId: "2aUYVQT3FnZyjCoo9Wb6An",
      externalLink: "https://open.spotify.com/track/2aUYVQT3FnZyjCoo9Wb6An",
    },
  ],
} as const satisfies Track
