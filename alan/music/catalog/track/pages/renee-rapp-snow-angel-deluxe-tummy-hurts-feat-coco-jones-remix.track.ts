import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeTummyHurtsFeatCocoJonesRemix = {
  id: "01a0caa9-0b58-7a3d-8e54-1f9af32a74a3",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-tummy-hurts-feat-coco-jones-remix",
  ownLength: 2.7991333333333333,
  ownProgress: 0,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Tummy Hurts (feat. Coco Jones) - Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [
    { externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" },
    { externalId: "4DHLoiIqFYYFjH09WduvFd", artistName: "Coco Jones" },
  ],
  trackKey: "tummyhurtsfeatcocojonesremix|2hUYKu1x0UZQXvzCmggvSn,4DHLoiIqFYYFjH09WduvFd|167948",
  song: "song/renee-rapp-tummy-hurts",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 16,
      externalId: "3WLW76a7K7krnGyF9s4lIk",
      externalLink: "https://open.spotify.com/track/3WLW76a7K7krnGyF9s4lIk",
    },
  ],
} as const satisfies Track
