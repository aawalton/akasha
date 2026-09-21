import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeIrresponsible = {
  id: "01a0c43e-7321-7b78-8ca0-43543c0675d3",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-irresponsible",
  ownLength: 2.0791833333333334,
  ownProgress: 2.0791833333333334,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mw8HJgOpIzYcxfiDCXpZP",
      externalLink: "https://open.spotify.com/track/7mw8HJgOpIzYcxfiDCXpZP",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Irresponsible",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "irresponsible|7E2aQQjErJocovYFjYLzWU|124751",
  song: "song/emei-irresponsible",
} as const satisfies Track
