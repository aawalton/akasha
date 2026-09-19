import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveYourSmilingFace = {
  id: "01a0abeb-3c22-797b-bfdc-a15c69d46c97",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-your-smiling-face",
  ownLength: 2.891766666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0qWeTfa2rF6Q0KICiGjr3j",
      externalLink: "https://open.spotify.com/track/0qWeTfa2rF6Q0KICiGjr3j",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Your Smiling Face",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "yoursmilingface|0vn7UBvSQECKJm2817Yf1P|173506",
  song: "song/james-taylor-your-smiling-face",
} as const satisfies Track
