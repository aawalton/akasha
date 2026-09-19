import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalk2SleepingSun = {
  id: "01a0b9ee-fe65-7d11-9beb-cf1b95b58270",
  type: "page-type/track",
  slug: "coldplay-talk-2-sleeping-sun",
  ownLength: 3.1893333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-talk-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0xkcOfbk2pyukCmMVTTauh",
      externalLink: "https://open.spotify.com/track/0xkcOfbk2pyukCmMVTTauh",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sleeping Sun",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "sleepingsun|4gzpq5DPGxSnKTe4SA8HAU|191360",
  song: "song/coldplay-sleeping-sun",
} as const satisfies Track
