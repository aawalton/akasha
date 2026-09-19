import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeFieldsOfGold = {
  id: "01a0abea-5adb-7983-b140-c1a5eae4280d",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-fields-of-gold",
  ownLength: 3.6024333333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 21,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1NqfIXMsh9l9ncGUy7CQg4",
      externalLink: "https://open.spotify.com/track/1NqfIXMsh9l9ncGUy7CQg4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fields Of Gold",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "fieldsofgold|6NWtt9pNOL2Gx7kBykdE5x|216146",
  song: "song/celtic-woman-fields-of-gold",
} as const satisfies Track
