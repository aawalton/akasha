import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyBabyMine = {
  id: "01a0abea-712e-7905-a435-9c57d2f490de",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-baby-mine",
  ownLength: 3.1704333333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5xzgVOaAbIP7Q1891QkK3u",
      externalLink: "https://open.spotify.com/track/5xzgVOaAbIP7Q1891QkK3u",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Baby Mine",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" },
    { externalId: "34sL9HIOU50t8u0IQMZeze", artistName: "Chloe Agnew" },
  ],
  trackKey: "babymine|34sL9HIOU50t8u0IQMZeze,6NWtt9pNOL2Gx7kBykdE5x|190226",
  song: "song/celtic-woman-baby-mine",
} as const satisfies Track
