import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeSnowAngel = {
  id: "01a0caa9-0c26-7198-bbd2-b225a639d9a8",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-snow-angel",
  ownLength: 3.591066666666667,
  ownProgress: 3.591066666666667,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Snow Angel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "snowangel|2hUYKu1x0UZQXvzCmggvSn|215464",
  song: "song/renee-rapp-snow-angel",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 5,
      externalId: "6skUuqrKMQIjjo75hWGAvQ",
      externalLink: "https://open.spotify.com/track/6skUuqrKMQIjjo75hWGAvQ",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "3hL6rM3wYeWgONISIHXg8G",
      externalLink: "https://open.spotify.com/track/3hL6rM3wYeWgONISIHXg8G",
    },
  ],
} as const satisfies Track
