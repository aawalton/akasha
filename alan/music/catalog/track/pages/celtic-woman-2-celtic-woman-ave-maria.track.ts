import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanAveMaria = {
  id: "01a0abea-78c6-76fa-9728-0b364ecf2912",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-ave-maria",
  ownLength: 2.8848833333333332,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4H6sxd2yQFmErBRl8cZIUi",
      externalLink: "https://open.spotify.com/track/4H6sxd2yQFmErBRl8cZIUi",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ave Maria",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "avemaria|6NWtt9pNOL2Gx7kBykdE5x|173093",
  song: "song/celtic-woman-ave-maria",
} as const satisfies Track
