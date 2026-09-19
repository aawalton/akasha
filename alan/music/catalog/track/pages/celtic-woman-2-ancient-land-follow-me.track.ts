import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandFollowMe = {
  id: "01a0abea-5c28-7899-b648-2257c7d9a2f6",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-follow-me",
  ownLength: 3.6437666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4sNXHUpqUmKuOdPMKRlDkI",
      externalLink: "https://open.spotify.com/track/4sNXHUpqUmKuOdPMKRlDkI",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Follow Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "followme|6NWtt9pNOL2Gx7kBykdE5x|218626",
  song: "song/celtic-woman-follow-me",
} as const satisfies Track
