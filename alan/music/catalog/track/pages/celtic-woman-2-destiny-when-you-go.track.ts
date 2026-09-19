import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyWhenYouGo = {
  id: "01a0abea-6996-723e-9369-992ad6406ed0",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-when-you-go",
  ownLength: 3.4861333333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4dvyIYRaZ0RFmn9ApWTCwU",
      externalLink: "https://open.spotify.com/track/4dvyIYRaZ0RFmn9ApWTCwU",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "When You Go",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "whenyougo|6NWtt9pNOL2Gx7kBykdE5x|209168",
  song: "song/celtic-woman-when-you-go",
} as const satisfies Track
