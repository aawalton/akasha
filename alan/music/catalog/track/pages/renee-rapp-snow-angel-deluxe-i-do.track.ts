import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeIDo = {
  id: "01a0caa9-0aec-7dc5-89de-42eab50fb645",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-i-do",
  ownLength: 2.656,
  ownProgress: 2.656,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Do",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "ido|2hUYKu1x0UZQXvzCmggvSn|159360",
  song: "song/renee-rapp-i-do",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "6sl8thmAsTzYfVw3jJ9z49",
      externalLink: "https://open.spotify.com/track/6sl8thmAsTzYfVw3jJ9z49",
    },
  ],
} as const satisfies Track
