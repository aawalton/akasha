import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoCharlieBrown = {
  id: "01a0b9ee-dc74-7170-9566-0c8a58db4325",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-charlie-brown",
  ownLength: 4.75265,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1yqMgZNrevsWMLWfO2PRp5",
      externalLink: "https://open.spotify.com/track/1yqMgZNrevsWMLWfO2PRp5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Charlie Brown",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "charliebrown|4gzpq5DPGxSnKTe4SA8HAU|285159",
} as const satisfies Track
