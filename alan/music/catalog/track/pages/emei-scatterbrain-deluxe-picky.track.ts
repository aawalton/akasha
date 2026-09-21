import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxePicky = {
  id: "01a0c43e-73a3-7037-a5e4-30ed48829b13",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-picky",
  ownLength: 2.34895,
  ownProgress: 2.34895,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 5,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zyUs70APSlE1TtlPpEJvy",
      externalLink: "https://open.spotify.com/track/6zyUs70APSlE1TtlPpEJvy",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Picky",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "picky|7E2aQQjErJocovYFjYLzWU|140937",
  song: "song/emei-picky",
} as const satisfies Track
