import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeIWish = {
  id: "01a0caa9-0d04-776c-8219-ef57c84493bc",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-i-wish",
  ownLength: 3.7176833333333335,
  ownProgress: 3.7176833333333335,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Wish",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "iwish|2hUYKu1x0UZQXvzCmggvSn|223061",
  song: "song/renee-rapp-i-wish",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 10,
      externalId: "26XwZdrPvfkZWe4MfF4VLw",
      externalLink: "https://open.spotify.com/track/26XwZdrPvfkZWe4MfF4VLw",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "6O479qefOZN8KjUJU0QpAU",
      externalLink: "https://open.spotify.com/track/6O479qefOZN8KjUJU0QpAU",
    },
  ],
} as const satisfies Track
