import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresHymnForTheWeekendLiveInBuenosAires = {
  id: "01a0b9ee-d329-75b8-bbb8-1385e9bf1c1b",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-hymn-for-the-weekend-live-in-buenos-aires",
  ownLength: 5.0491,
  ownProgress: 5.0491,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0w6X9iRKrMyDpRRtbu4tE0",
      externalLink: "https://open.spotify.com/track/0w6X9iRKrMyDpRRtbu4tE0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hymn for the Weekend - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "hymnfortheweekendliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|302946",
  song: "song/coldplay-hymn-for-the-weekend",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 13,
      externalId: "0w6X9iRKrMyDpRRtbu4tE0",
      externalLink: "https://open.spotify.com/track/0w6X9iRKrMyDpRRtbu4tE0",
    },
  ],
} as const satisfies Track
