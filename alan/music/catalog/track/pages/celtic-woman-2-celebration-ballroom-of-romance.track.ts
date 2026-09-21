import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationBallroomOfRomance = {
  id: "01a0abea-552c-79ba-b31d-2b08771ee437",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-ballroom-of-romance",
  ownLength: 3.30155,
  ownProgress: 3.30155,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nQtFJNSGwEKPDtExs6YEg",
      externalLink: "https://open.spotify.com/track/3nQtFJNSGwEKPDtExs6YEg",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ballroom Of Romance",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "ballroomofromance|6NWtt9pNOL2Gx7kBykdE5x|198093",
  song: "song/celtic-woman-ballroom-of-romance",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celebration",
      discNumber: 1,
      position: 2,
      externalId: "3nQtFJNSGwEKPDtExs6YEg",
      externalLink: "https://open.spotify.com/track/3nQtFJNSGwEKPDtExs6YEg",
    },
  ],
} as const satisfies Track
