import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012MajorMinusLive = {
  id: "01a0b9ee-d9f7-7650-81bd-ab9f58b95022",
  type: "page-type/track",
  slug: "coldplay-live-2012-major-minus-live",
  ownLength: 3.6662166666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WyX6hwqB1forx046ilrg2",
      externalLink: "https://open.spotify.com/track/4WyX6hwqB1forx046ilrg2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Major Minus - Live",
  trackType: "live",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "majorminuslive|4gzpq5DPGxSnKTe4SA8HAU|219973",
  song: "song/coldplay-major-minus",
} as const satisfies Track
