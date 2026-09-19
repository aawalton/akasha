import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyISeeFire = {
  id: "01a0abea-68c8-7003-a2cd-eeba5aff9327",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-i-see-fire",
  ownLength: 5.127683333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bPfi2jGyVPXeNwrBcFXIs",
      externalLink: "https://open.spotify.com/track/2bPfi2jGyVPXeNwrBcFXIs",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I See Fire",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "iseefire|6NWtt9pNOL2Gx7kBykdE5x|307661",
  song: "song/celtic-woman-i-see-fire",
} as const satisfies Track
