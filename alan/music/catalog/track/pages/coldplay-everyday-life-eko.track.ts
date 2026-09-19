import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeEko = {
  id: "01a0b9ee-d060-7fb3-9752-9ddd9099937a",
  type: "page-type/track",
  slug: "coldplay-everyday-life-eko",
  ownLength: 2.6311,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HUtNS9qtfgWbnaagK6AAe",
      externalLink: "https://open.spotify.com/track/2HUtNS9qtfgWbnaagK6AAe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Èkó",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "eko|4gzpq5DPGxSnKTe4SA8HAU|157866",
  song: "song/coldplay-eko",
} as const satisfies Track
