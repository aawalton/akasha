import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtSecretOLife = {
  id: "01a0abeb-4672-7e2f-8037-4ffc8e6fdb72",
  type: "page-type/track",
  slug: "james-taylor-2-jt-secret-o-life",
  ownLength: 3.5866666666666664,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3IGAJam8XPmbBjCAvpCW8N",
      externalLink: "https://open.spotify.com/track/3IGAJam8XPmbBjCAvpCW8N",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Secret O' Life",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "secretolife|0vn7UBvSQECKJm2817Yf1P|215200",
  song: "song/james-taylor-secret-o-life",
} as const satisfies Track
