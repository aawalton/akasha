import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeMoon = {
  id: "01a0caa9-1144-77bc-a1cb-db0884649bde",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-moon",
  ownLength: 2.9988333333333332,
  ownProgress: 2.9988333333333332,
  partOfCollections: [
    "release/renee-rapp-everything-to-everyone-deluxe",
    "release/renee-rapp-everything-to-everyone",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Moon",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "moon|2hUYKu1x0UZQXvzCmggvSn|179930",
  song: "song/renee-rapp-moon",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone",
      discNumber: 1,
      position: 7,
      externalId: "3jJNg3l3NoZwQKESfr04VS",
      externalLink: "https://open.spotify.com/track/3jJNg3l3NoZwQKESfr04VS",
    },
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "4ThYkuMc4YmuhEz7WeobOG",
      externalLink: "https://open.spotify.com/track/4ThYkuMc4YmuhEz7WeobOG",
    },
  ],
} as const satisfies Track
