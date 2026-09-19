import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FireFire = {
  id: "01a0abeb-5066-7625-8b1d-755a0149deb7",
  type: "page-type/track",
  slug: "james-taylor-2-fire-fire",
  ownLength: 5.083333333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-fire"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cavUWhdiwvVTylTP7j3Y9",
      externalLink: "https://open.spotify.com/track/3cavUWhdiwvVTylTP7j3Y9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fire",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "1DJVvIcjKhdedkuGRzW7PG", artistName: "The New Mastersounds" },
  ],
  trackKey: "fire|0vn7UBvSQECKJm2817Yf1P,1DJVvIcjKhdedkuGRzW7PG|305000",
  song: "song/james-taylor-fire",
} as const satisfies Track
