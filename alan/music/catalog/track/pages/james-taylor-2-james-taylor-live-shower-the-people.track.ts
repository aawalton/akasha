import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveShowerThePeople = {
  id: "01a0abeb-3d25-7227-bfcc-3a23df15f032",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-shower-the-people",
  ownLength: 4.684433333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4EQRoY0llP5bsvobC7jzM4",
      externalLink: "https://open.spotify.com/track/4EQRoY0llP5bsvobC7jzM4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Shower the People",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "showerthepeople|0vn7UBvSQECKJm2817Yf1P|281066",
  song: "song/james-taylor-shower-the-people",
} as const satisfies Track
