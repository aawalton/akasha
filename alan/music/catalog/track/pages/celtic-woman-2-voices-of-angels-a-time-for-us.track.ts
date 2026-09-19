import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2VoicesOfAngelsATimeForUs = {
  id: "01a0abea-60d8-7461-ae51-b6c414c0ec82",
  type: "page-type/track",
  slug: "celtic-woman-2-voices-of-angels-a-time-for-us",
  ownLength: 4.026,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-voices-of-angels"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nx5LQp5d9Yh1Pf0NTDsE9",
      externalLink: "https://open.spotify.com/track/6nx5LQp5d9Yh1Pf0NTDsE9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "A Time For Us",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "atimeforus|6NWtt9pNOL2Gx7kBykdE5x|241560",
  song: "song/celtic-woman-a-time-for-us",
} as const satisfies Track
