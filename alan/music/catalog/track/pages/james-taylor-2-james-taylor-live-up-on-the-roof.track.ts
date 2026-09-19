import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveUpOnTheRoof = {
  id: "01a0abeb-3dfb-7d40-b64e-10639a23dffe",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-up-on-the-roof",
  ownLength: 4.1528833333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2R1M1otgehlvcvPtrgqBuq",
      externalLink: "https://open.spotify.com/track/2R1M1otgehlvcvPtrgqBuq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Up On The Roof",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "upontheroof|0vn7UBvSQECKJm2817Yf1P|249173",
  song: "song/james-taylor-up-on-the-roof",
} as const satisfies Track
