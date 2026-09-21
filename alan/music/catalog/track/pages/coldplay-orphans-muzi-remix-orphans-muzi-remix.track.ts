import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayOrphansMuziRemixOrphansMuziRemix = {
  id: "01a0b9ee-f0f3-7ed2-b9ac-734cdbb28cc2",
  type: "page-type/track",
  slug: "coldplay-orphans-muzi-remix-orphans-muzi-remix",
  ownLength: 3.686,
  ownProgress: 3.686,
  partOfCollections: ["release/coldplay-orphans-muzi-remix"],
  status: "completed",
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
  carriedBy: [
    {
      release: "release/coldplay-orphans-muzi-remix",
      discNumber: 1,
      position: 1,
      externalId: "5x5SYDpamwxXJG675ArNMr",
      externalLink: "https://open.spotify.com/track/5x5SYDpamwxXJG675ArNMr",
    },
  ],
} as const satisfies Track
