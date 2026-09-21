import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeScatterbrain = {
  id: "01a0c43e-72dc-7f0e-8beb-23c83d21d71a",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-scatterbrain",
  ownLength: 2.1656333333333335,
  ownProgress: 2.1656333333333335,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6O2bj4fwNzE3emEcjYzQu6",
      externalLink: "https://open.spotify.com/track/6O2bj4fwNzE3emEcjYzQu6",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Scatterbrain",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "scatterbrain|7E2aQQjErJocovYFjYLzWU|129938",
  song: "song/emei-scatterbrain",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "6O2bj4fwNzE3emEcjYzQu6",
      externalLink: "https://open.spotify.com/track/6O2bj4fwNzE3emEcjYzQu6",
    },
  ],
} as const satisfies Track
