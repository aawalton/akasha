import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeMessy = {
  id: "01a0caa9-0aa6-78e7-837e-c6d9a87c08f7",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-messy",
  ownLength: 3.1575166666666665,
  ownProgress: 3.1575166666666665,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Messy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "messy|2hUYKu1x0UZQXvzCmggvSn|189451",
  song: "song/renee-rapp-messy",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "6Aq5jj99FHObab4hcfwR4i",
      externalLink: "https://open.spotify.com/track/6Aq5jj99FHObab4hcfwR4i",
    },
  ],
} as const satisfies Track
