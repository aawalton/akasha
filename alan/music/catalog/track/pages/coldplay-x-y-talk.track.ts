import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYTalk = {
  id: "01a0b9ee-e476-7658-938f-bfaa63743c21",
  type: "page-type/track",
  slug: "coldplay-x-y-talk",
  ownLength: 5.188183333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4wzt5Rrk3W98pHXAqutuJw",
      externalLink: "https://open.spotify.com/track/4wzt5Rrk3W98pHXAqutuJw",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "talk|4gzpq5DPGxSnKTe4SA8HAU|311291",
  song: "song/coldplay-talk",
} as const satisfies Track
