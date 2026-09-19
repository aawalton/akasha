import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003PolitikLiveInSydney = {
  id: "01a0b9ee-e5cc-714c-8e1f-a8744f123247",
  type: "page-type/track",
  slug: "coldplay-live-2003-politik-live-in-sydney",
  ownLength: 6.607766666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "110a2YFVoGswehZi2kkVpp",
      externalLink: "https://open.spotify.com/track/110a2YFVoGswehZi2kkVpp",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Politik - Live in Sydney",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "politikliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|396466",
  song: "song/coldplay-politik",
} as const satisfies Track
