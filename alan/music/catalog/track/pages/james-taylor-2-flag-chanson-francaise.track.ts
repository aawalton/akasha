import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagChansonFrancaise = {
  id: "01a0abeb-459a-7ed1-adcb-ab73d722b62a",
  type: "page-type/track",
  slug: "james-taylor-2-flag-chanson-francaise",
  ownLength: 2.0317666666666665,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1tzcT5sLgvckDDbHnHdouQ",
      externalLink: "https://open.spotify.com/track/1tzcT5sLgvckDDbHnHdouQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Chanson Francaise",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "chansonfrancaise|0vn7UBvSQECKJm2817Yf1P|121906",
  song: "song/james-taylor-chanson-francaise",
} as const satisfies Track
