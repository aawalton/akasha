import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayOrphansMuziRemixOrphansMuziRemix = {
  id: "01a0b9ee-f0f3-7ed2-b9ac-734cdbb28cc2",
  type: "page-type/track",
  slug: "coldplay-orphans-muzi-remix-orphans-muzi-remix",
  ownLength: 3.686,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-orphans-muzi-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5x5SYDpamwxXJG675ArNMr",
      externalLink: "https://open.spotify.com/track/5x5SYDpamwxXJG675ArNMr",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Orphans - Muzi Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "4fd3n8zcAmsG2up1QWDNj5", artistName: "Muzi" },
  ],
  trackKey: "orphansmuziremix|4fd3n8zcAmsG2up1QWDNj5,4gzpq5DPGxSnKTe4SA8HAU|221160",
  song: "song/coldplay-orphans",
} as const satisfies Track
