import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeBallroomOfRomance = {
  id: "01a0abea-5a7b-749f-9bfb-52d866c33534",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-ballroom-of-romance",
  ownLength: 3.2682166666666665,
  ownProgress: 3.2682166666666665,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ballroom-of-romance",
  ],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "54NdJzrlrl1uPIoR7CGsuf",
      externalLink: "https://open.spotify.com/track/54NdJzrlrl1uPIoR7CGsuf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ballroom Of Romance",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "ballroomofromance|6NWtt9pNOL2Gx7kBykdE5x|196093",
  song: "song/celtic-woman-ballroom-of-romance",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 18,
      externalId: "54NdJzrlrl1uPIoR7CGsuf",
      externalLink: "https://open.spotify.com/track/54NdJzrlrl1uPIoR7CGsuf",
    },
    {
      release: "release/celtic-woman-2-ballroom-of-romance",
      discNumber: 1,
      position: 1,
      externalId: "3BrK8g4YmVdZJDJ2JYJUB0",
      externalLink: "https://open.spotify.com/track/3BrK8g4YmVdZJDJ2JYJUB0",
    },
  ],
} as const satisfies Track
