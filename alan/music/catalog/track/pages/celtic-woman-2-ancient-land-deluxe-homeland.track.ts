import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeHomeland = {
  id: "01a0abea-587b-79d4-a6c5-d183f3440295",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-homeland",
  ownLength: 4.318216666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2GFMWA2Suq95XmxCBX84LI",
      externalLink: "https://open.spotify.com/track/2GFMWA2Suq95XmxCBX84LI",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Homeland",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "homeland|6NWtt9pNOL2Gx7kBykdE5x|259093",
  song: "song/celtic-woman-homeland",
} as const satisfies Track
