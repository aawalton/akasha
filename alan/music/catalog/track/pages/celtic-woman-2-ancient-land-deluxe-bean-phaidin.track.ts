import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeBeanPhaidin = {
  id: "01a0abea-5aff-7417-96cf-8da1487abec9",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-bean-phaidin",
  ownLength: 3.282216666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 22,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4RlJP9xY4sXsMCskpdVgR2",
      externalLink: "https://open.spotify.com/track/4RlJP9xY4sXsMCskpdVgR2",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Bean Pháidín",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "beanphaidin|6NWtt9pNOL2Gx7kBykdE5x|196933",
  song: "song/celtic-woman-bean-phaidin",
} as const satisfies Track
