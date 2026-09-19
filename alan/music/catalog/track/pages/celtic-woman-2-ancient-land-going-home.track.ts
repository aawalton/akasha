import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandGoingHome = {
  id: "01a0abea-5d96-70f6-a882-5a56e5d09639",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-going-home",
  ownLength: 4.0331,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40Ip7UhsWGMjjoXGzJw2rY",
      externalLink: "https://open.spotify.com/track/40Ip7UhsWGMjjoXGzJw2rY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Going Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "goinghome|6NWtt9pNOL2Gx7kBykdE5x|241986",
  song: "song/celtic-woman-going-home",
} as const satisfies Track
