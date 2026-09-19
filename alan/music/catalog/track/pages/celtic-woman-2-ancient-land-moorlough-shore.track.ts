import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandMoorloughShore = {
  id: "01a0abea-5c05-75f1-b39e-0ab131ba2071",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-moorlough-shore",
  ownLength: 4.09,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YifpYP7WBYtCxcc2UJZiC",
      externalLink: "https://open.spotify.com/track/1YifpYP7WBYtCxcc2UJZiC",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Moorlough Shore",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "moorloughshore|6NWtt9pNOL2Gx7kBykdE5x|245400",
  song: "song/celtic-woman-moorlough-shore",
} as const satisfies Track
