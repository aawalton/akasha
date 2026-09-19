import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagBrotherTrucker = {
  id: "01a0abeb-44ee-7b26-8c16-da924006f635",
  type: "page-type/track",
  slug: "james-taylor-2-flag-brother-trucker",
  ownLength: 4.014433333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3usf2U2VlBuUtBDPzTS2Ok",
      externalLink: "https://open.spotify.com/track/3usf2U2VlBuUtBDPzTS2Ok",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Brother Trucker",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "brothertrucker|0vn7UBvSQECKJm2817Yf1P|240866",
  song: "song/james-taylor-brother-trucker",
} as const satisfies Track
