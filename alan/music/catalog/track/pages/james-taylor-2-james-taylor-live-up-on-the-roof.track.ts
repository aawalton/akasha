import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveUpOnTheRoof = {
  id: "01a0abeb-3dfb-7d40-b64e-10639a23dffe",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-up-on-the-roof",
  ownLength: 4.1528833333333335,
  ownProgress: 4.1528833333333335,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
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
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 5,
      externalId: "2R1M1otgehlvcvPtrgqBuq",
      externalLink: "https://open.spotify.com/track/2R1M1otgehlvcvPtrgqBuq",
    },
  ],
} as const satisfies Track
