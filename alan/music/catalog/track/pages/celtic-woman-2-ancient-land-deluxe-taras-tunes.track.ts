import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeTarasTunes = {
  id: "01a0abea-599f-78df-ae40-6dc4fab946b7",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-taras-tunes",
  ownLength: 4.248883333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0B1BsqDgLi43kBFcZievzi",
      externalLink: "https://open.spotify.com/track/0B1BsqDgLi43kBFcZievzi",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Tara’s Tunes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "tarastunes|6NWtt9pNOL2Gx7kBykdE5x|254933",
  song: "song/celtic-woman-taras-tunes",
} as const satisfies Track
