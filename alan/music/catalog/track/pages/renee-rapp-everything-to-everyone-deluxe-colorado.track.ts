import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeColorado = {
  id: "01a0caa9-109c-7639-a0bf-cc6d69fe9444",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-colorado",
  ownLength: 2.88075,
  ownProgress: 0,
  partOfCollections: [
    "release/renee-rapp-everything-to-everyone-deluxe",
    "release/renee-rapp-everything-to-everyone",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Colorado",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "colorado|2hUYKu1x0UZQXvzCmggvSn|172845",
  song: "song/renee-rapp-colorado",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone",
      discNumber: 1,
      position: 3,
      externalId: "1nnyYFtJHwVbph84SctOtC",
      externalLink: "https://open.spotify.com/track/1nnyYFtJHwVbph84SctOtC",
    },
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "23a0bUTFqwpoXXWbVMc1wT",
      externalLink: "https://open.spotify.com/track/23a0bUTFqwpoXXWbVMc1wT",
    },
  ],
} as const satisfies Track
