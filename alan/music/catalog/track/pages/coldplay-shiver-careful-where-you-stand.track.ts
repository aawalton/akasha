import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayShiverCarefulWhereYouStand = {
  id: "01a0b9ef-0460-7c91-b766-88767bec2134",
  type: "page-type/track",
  slug: "coldplay-shiver-careful-where-you-stand",
  ownLength: 4.7504333333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-shiver"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6V3U7whxAMRzOLTli2zt26",
      externalLink: "https://open.spotify.com/track/6V3U7whxAMRzOLTli2zt26",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Careful Where You Stand",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "carefulwhereyoustand|4gzpq5DPGxSnKTe4SA8HAU|285026",
  song: "song/coldplay-careful-where-you-stand",
} as const satisfies Track
