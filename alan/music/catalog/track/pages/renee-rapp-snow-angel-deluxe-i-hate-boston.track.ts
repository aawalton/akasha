import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeIHateBoston = {
  id: "01a0caa9-0bb1-7d15-9c66-cb71347f5179",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-i-hate-boston",
  ownLength: 2.905266666666667,
  ownProgress: 2.905266666666667,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Hate Boston",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "ihateboston|2hUYKu1x0UZQXvzCmggvSn|174316",
  song: "song/renee-rapp-i-hate-boston",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 2,
      externalId: "5862ZA0ML6YODkxQF5UkgR",
      externalLink: "https://open.spotify.com/track/5862ZA0ML6YODkxQF5UkgR",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "0kO4toO6Wqde0p84YIixQ9",
      externalLink: "https://open.spotify.com/track/0kO4toO6Wqde0p84YIixQ9",
    },
  ],
} as const satisfies Track
