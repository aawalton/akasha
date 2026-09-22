import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeWhatCanIDo = {
  id: "01a0caa9-10ee-7a47-b64b-469d9728dc8c",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-what-can-i-do",
  ownLength: 2.7948166666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/renee-rapp-everything-to-everyone-deluxe",
    "release/renee-rapp-everything-to-everyone",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "What Can I Do",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "whatcanido|2hUYKu1x0UZQXvzCmggvSn|167689",
  song: "song/renee-rapp-what-can-i-do",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone",
      discNumber: 1,
      position: 5,
      externalId: "3H5Bg4ij1nbEmMmzDnZYri",
      externalLink: "https://open.spotify.com/track/3H5Bg4ij1nbEmMmzDnZYri",
    },
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "61MLNB6eqBrn1QmbmQgspC",
      externalLink: "https://open.spotify.com/track/61MLNB6eqBrn1QmbmQgspC",
    },
  ],
} as const satisfies Track
