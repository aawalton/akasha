import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeWillow = {
  id: "01a0caa9-0d2c-79fb-bd86-da13a1b5e1e1",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-willow",
  ownLength: 2.6919,
  ownProgress: 2.6919,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Willow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "willow|2hUYKu1x0UZQXvzCmggvSn|161514",
  song: "song/renee-rapp-willow",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 11,
      externalId: "2XAkMpygJilfoQBV9dx0rH",
      externalLink: "https://open.spotify.com/track/2XAkMpygJilfoQBV9dx0rH",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "6aazpzwi4ScHO6bzA4qz4t",
      externalLink: "https://open.spotify.com/track/6aazpzwi4ScHO6bzA4qz4t",
    },
  ],
} as const satisfies Track
