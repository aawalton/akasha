import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeTooWell = {
  id: "01a0caa9-1117-7bce-a971-28540c0c506e",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-too-well",
  ownLength: 2.610516666666667,
  ownProgress: 2.610516666666667,
  partOfCollections: [
    "release/renee-rapp-everything-to-everyone-deluxe",
    "release/renee-rapp-everything-to-everyone",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Too Well",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "toowell|2hUYKu1x0UZQXvzCmggvSn|156631",
  song: "song/renee-rapp-too-well",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone",
      discNumber: 1,
      position: 6,
      externalId: "6Szgu8v7CAapag3XuuJX0b",
      externalLink: "https://open.spotify.com/track/6Szgu8v7CAapag3XuuJX0b",
    },
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "1zKKkjjWXjsO06inUVobed",
      externalLink: "https://open.spotify.com/track/1zKKkjjWXjsO06inUVobed",
    },
  ],
} as const satisfies Track
