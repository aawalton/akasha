import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeTummyHurts = {
  id: "01a0caa9-0cd3-7770-b169-f672d7478a5d",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-tummy-hurts",
  ownLength: 2.8163,
  ownProgress: 2.8163,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tummy Hurts",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "tummyhurts|2hUYKu1x0UZQXvzCmggvSn|168978",
  song: "song/renee-rapp-tummy-hurts",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 9,
      externalId: "0hFTdvxUbHl1CqrdZcbWtZ",
      externalLink: "https://open.spotify.com/track/0hFTdvxUbHl1CqrdZcbWtZ",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "5McRBAz14DzYMnZPQWaXDu",
      externalLink: "https://open.spotify.com/track/5McRBAz14DzYMnZPQWaXDu",
    },
  ],
} as const satisfies Track
