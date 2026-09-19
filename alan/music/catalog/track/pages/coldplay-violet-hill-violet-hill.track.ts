import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVioletHillVioletHill = {
  id: "01a0b9ee-fd27-777b-945b-c1322933728b",
  type: "page-type/track",
  slug: "coldplay-violet-hill-violet-hill",
  ownLength: 3.7108833333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-violet-hill"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GkNsL57ICbvte2aqyRkYD",
      externalLink: "https://open.spotify.com/track/5GkNsL57ICbvte2aqyRkYD",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Violet Hill",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "violethill|4gzpq5DPGxSnKTe4SA8HAU|222653",
  song: "song/coldplay-violet-hill",
} as const satisfies Track
