import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeDearEmily = {
  id: "01a0c43e-735a-7ab5-abfc-3f8c3f4dadc7",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-dear-emily",
  ownLength: 2.7156166666666666,
  ownProgress: 2.7156166666666666,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6JKdddBaYpm92OVGtlddkE",
      externalLink: "https://open.spotify.com/track/6JKdddBaYpm92OVGtlddkE",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Dear Emily",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "dearemily|7E2aQQjErJocovYFjYLzWU|162937",
  song: "song/emei-dear-emily",
} as const satisfies Track
