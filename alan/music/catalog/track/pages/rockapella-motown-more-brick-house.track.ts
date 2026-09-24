import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreBrickHouse = {
  id: "01a0d52b-52de-7c2a-9b36-9dea861cc244",
  type: "page-type/track",
  slug: "rockapella-motown-more-brick-house",
  ownLength: 3.4776166666666666,
  ownProgress: 3.4776166666666666,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "completed",
  unit: "unit/minutes",
  title: "Brick House",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "brickhouse|1AFSUleuDTapVhm5zUf4ix|208657",
  song: "song/rockapella-brick-house",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 2,
      externalId: "1phuZcBdVdX1KxmPJiNsQA",
      externalLink: "https://open.spotify.com/track/1phuZcBdVdX1KxmPJiNsQA",
    },
  ],
} as const satisfies Track
