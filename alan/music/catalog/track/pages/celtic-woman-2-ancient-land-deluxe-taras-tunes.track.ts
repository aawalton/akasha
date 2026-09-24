import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeTarasTunes = {
  id: "01a0abea-599f-78df-ae40-6dc4fab946b7",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-taras-tunes",
  ownLength: 4.248883333333334,
  ownProgress: 4.248883333333334,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Tara’s Tunes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "tarastunes|6NWtt9pNOL2Gx7kBykdE5x|254933",
  song: "song/celtic-woman-taras-tunes",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 11,
      externalId: "3aGiYndzAVhVa51kIe1bTd",
      externalLink: "https://open.spotify.com/track/3aGiYndzAVhVa51kIe1bTd",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "0B1BsqDgLi43kBFcZievzi",
      externalLink: "https://open.spotify.com/track/0B1BsqDgLi43kBFcZievzi",
    },
  ],
} as const satisfies Track
