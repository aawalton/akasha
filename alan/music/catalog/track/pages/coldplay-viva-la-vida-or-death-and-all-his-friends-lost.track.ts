import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsLost = {
  id: "01a0b9ee-e2bc-7738-b545-b8fdb33b9788",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-lost",
  ownLength: 3.9368833333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-or-death-and-all-his-friends"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1STAWoWHYJh2UVUx41pYMD",
      externalLink: "https://open.spotify.com/track/1STAWoWHYJh2UVUx41pYMD",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost!",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lost|4gzpq5DPGxSnKTe4SA8HAU|236213",
  song: "song/coldplay-lost",
} as const satisfies Track
