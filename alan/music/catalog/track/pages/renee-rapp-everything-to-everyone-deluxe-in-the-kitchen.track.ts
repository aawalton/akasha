import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeInTheKitchen = {
  id: "01a0caa9-1071-7162-b5c3-d83161dac359",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-in-the-kitchen",
  ownLength: 3.7958166666666666,
  ownProgress: 0,
  partOfCollections: [
    "release/renee-rapp-everything-to-everyone-deluxe",
    "release/renee-rapp-everything-to-everyone",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "In The Kitchen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "inthekitchen|2hUYKu1x0UZQXvzCmggvSn|227749",
  song: "song/renee-rapp-in-the-kitchen",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone",
      discNumber: 1,
      position: 2,
      externalId: "2VFetGqLYq0Pc8ZtRYCaeL",
      externalLink: "https://open.spotify.com/track/2VFetGqLYq0Pc8ZtRYCaeL",
    },
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "44EmuDeJW0Io8HIUUIdgIR",
      externalLink: "https://open.spotify.com/track/44EmuDeJW0Io8HIUUIdgIR",
    },
  ],
} as const satisfies Track
