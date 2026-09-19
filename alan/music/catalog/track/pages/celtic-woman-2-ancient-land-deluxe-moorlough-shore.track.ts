import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeMoorloughShore = {
  id: "01a0abea-5897-74d7-97e3-03d66d3df3e9",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-moorlough-shore",
  ownLength: 4.09,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FCsaydqqqwZ34KZVHxPpv",
      externalLink: "https://open.spotify.com/track/0FCsaydqqqwZ34KZVHxPpv",
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
